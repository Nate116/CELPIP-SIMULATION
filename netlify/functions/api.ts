import express, { Request, Response } from 'express';
import serverless from 'serverless-http';
import { createApiRouter } from '../../server/apiRouter';

const app = express();
app.use(express.json({ limit: '50mb' }));

// Mount router both on root and /api for versatile Netlify redirect handling
const apiRouter = createApiRouter();
app.use('/api', apiRouter);
app.use('/', apiRouter);

// Global fallback handler for any unhandled routes in the serverless function
app.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Function endpoint not found' });
});

export const handler = serverless(app);
