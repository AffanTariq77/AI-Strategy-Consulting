import type { VercelRequest, VercelResponse } from '@vercel/node';

// In-memory submissions array for demo (replace with DB in production)
const submissions: any[] = [];

export default function handler(req: VercelRequest, res: VercelResponse) {
  // TODO: Add authentication
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  return res.status(200).json(submissions);
}
