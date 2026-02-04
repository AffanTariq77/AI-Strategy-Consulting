import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://ukpqtndwquvlxjmkwyhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHF0bmR3cXV2bHhqbWt3eWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Nzk0NDMsImV4cCI6MjA4NTI1NTQ0M30.DQ7c7ePSMBLtFwhCt8HRQbl7h7K6JVROt5qSCrdJLr8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    const { data, error } = await supabase.from('submissions').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  } else if (req.method === 'POST') {
    const submission = req.body;
    const { data, error } = await supabase.from('submissions').insert([submission]).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json(data[0]);
  } else {
    return res.status(405).json({ error: 'Method not allowed' });
  }
}
