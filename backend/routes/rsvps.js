const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

/**
 * @swagger
 * /api/rsvps:
 *   post:
 *     summary: RSVP to an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Going, Maybe, Not Going]
 *     responses:
 *       201:
 *         description: RSVP created successfully
 *       500:
 *         description: Error creating RSVP
 */
router.post('/', async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('userId', userId)
      .input('eventId', eventId)
      .input('status', status)
      .query(`
        INSERT INTO RSVPs (user_id, event_id, status)
        VALUES (@userId, @eventId, @status);
      `);
    res.status(201).json({ message: 'RSVP created successfully' });
  } catch (err) {
    console.error('Error creating RSVP:', err);
    res.status(500).json({ error: 'Error creating RSVP' });
  }
});

/**
 * @swagger
 * /api/rsvps/{eventId}:
 *   get:
 *     summary: Get all RSVPs for a specific event
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A list of RSVPs for the event.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   user_id:
 *                     type: integer
 *                   event_id:
 *                     type: integer
 *                   status:
 *                     type: string
 *       404:
 *         description: Event not found
 */
router.get('/:eventId', async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('eventId', eventId)
      .query(`SELECT * FROM RSVPs WHERE event_id = @eventId;`);
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'No RSVPs found for this event' });
    }
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching RSVPs:', err);
    res.status(500).json({ error: 'Error fetching RSVPs' });
  }
});

/**
 * @swagger
 * /api/rsvps:
 *   put:
 *     summary: Update RSVP status for an event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               userId:
 *                 type: integer
 *               eventId:
 *                 type: integer
 *               status:
 *                 type: string
 *                 enum: [Going, Maybe, Not Going]
 *     responses:
 *       200:
 *         description: RSVP updated successfully
 *       404:
 *         description: RSVP not found
 *       500:
 *         description: Error updating RSVP
 */
router.put('/', async (req, res) => {
  try {
    const { userId, eventId, status } = req.body;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('userId', userId)
      .input('eventId', eventId)
      .input('status', status)
      .query(`
        UPDATE RSVPs
        SET status = @status
        WHERE user_id = @userId AND event_id = @eventId;
      `);
    if (result.rowsAffected[0] === 0) {
      return res.status(404).json({ message: 'RSVP not found' });
    }
    res.status(200).json({ message: 'RSVP updated successfully' });
  } catch (err) {
    console.error('Error updating RSVP:', err);
    res.status(500).json({ error: 'Error updating RSVP' });
  }
});

module.exports = router;
