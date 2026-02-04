import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://ukpqtndwquvlxjmkwyhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHF0bmR3cXV2bHhqbWt3eWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Nzk0NDMsImV4cCI6MjA4NTI1NTQ0M30.DQ7c7ePSMBLtFwhCt8HRQbl7h7K6JVROt5qSCrdJLr8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'GET') {
    // Optionally, fetch all submissions (or disable for privacy)
    const { data, error } = await supabase.from('submissions').select('*');
    if (error) return res.status(500).json({ error: error.message });
    return res.status(200).json(data);
  }
  if (req.method === 'POST') {
    const { name, email, company, message } = req.body;
    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const submission = {
      name,
      email,
      company: company || '',
      message,
      created_at: new Date().toISOString(),
    };
    const { data, error } = await supabase.from('submissions').insert([submission]).select();
    if (error) return res.status(500).json({ error: error.message });
    return res.status(201).json({ success: true, id: data[0]?.id });
  }
  return res.status(405).json({ error: 'Method not allowed' });
}
