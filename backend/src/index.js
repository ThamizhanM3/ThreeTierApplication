
    import express from 'express';
    import { pool, healthCheck } from './db.js';

    const app = express();
    app.use(express.json());

    app.get('/health', async (_req, res) => {
      try {
        const ok = await healthCheck();
        return res.status(ok ? 200 : 500).send(ok ? 'OK' : 'DB NOT OK');
      } catch {
        return res.status(500).send('ERROR');
      }
    });

    app.get('/api/items', async (_req, res) => {
      try {
        const [rows] = await pool.query('SELECT id, name FROM items ORDER BY id');
        res.json(rows);
      } catch (e) {
        console.error(e);
        res.status(500).json({ error: 'query_failed' });
      }
    });

    app.get('/', (_req, res) => res.status(200).send('Backend is up and running!'));

    const port = process.env.PORT || 3000;
    app.listen(port, () => console.log(`API listening on ${port}`));
