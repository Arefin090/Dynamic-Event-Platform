const express = require('express');
const router = express.Router();
const { poolPromise } = require('../db');

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Retrieve a list of events
 *     responses:
 *       200:
 *         description: A list of events.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   title:
 *                     type: string
 *                   description:
 *                     type: string
 *                   date:
 *                     type: string
 *                     format: date
 *                   location:
 *                     type: string
 */
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`SELECT * FROM Events;`);
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error('Error fetching events:', err);
    res.status(500).json({ error: 'Error fetching events' });
  }
});

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       201:
 *         description: Event created successfully
 *       500:
 *         description: Error creating event
 */
router.post('/', async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('title', title)
      .input('description', description)
      .input('date', date)
      .input('location', location)
      .query(`
        INSERT INTO Events (title, description, date, location)
        VALUES (@title, @description, @date, @location);
      `);
    res.status(201).json({ message: 'Event created successfully' });
  } catch (err) {
    console.error('Error creating event:', err);
    res.status(500).json({ error: 'Error creating event' });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Retrieve a specific event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: A specific event object
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 title:
 *                   type: string
 *                 description:
 *                   type: string
 *                 date:
 *                   type: string
 *                   format: date
 *                 location:
 *                   type: string
 *       404:
 *         description: Event not found
 */
router.get('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const pool = await poolPromise;
    const result = await pool.request()
      .input('id', eventId)
      .query(`SELECT * FROM Events WHERE id = @id;`);
    if (result.recordset.length === 0) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.status(200).json(result.recordset[0]);
  } catch (err) {
    console.error('Error fetching event:', err);
    res.status(500).json({ error: 'Error fetching event' });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date
 *               location:
 *                 type: string
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error updating event
 */
router.put('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const { title, description, date, location } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', eventId)
      .input('title', title)
      .input('description', description)
      .input('date', date)
      .input('location', location)
      .query(`
        UPDATE Events
        SET title = @title, description = @description, date = @date, location = @location
        WHERE id = @id;
      `);
    res.status(200).json({ message: 'Event updated successfully' });
  } catch (err) {
    console.error('Error updating event:', err);
    res.status(500).json({ error: 'Error updating event' });
  }
});

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The event ID
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 *       500:
 *         description: Error deleting event
 */
router.delete('/:id', async (req, res) => {
  try {
    const eventId = req.params.id;
    const pool = await poolPromise;
    await pool.request()
      .input('id', eventId)
      .query(`DELETE FROM Events WHERE id = @id;`);
    res.status(200).json({ message: 'Event deleted successfully' });
  } catch (err) {
    console.error('Error deleting event:', err);
    res.status(500).json({ error: 'Error deleting event' });
  }
});

module.exports = router;
