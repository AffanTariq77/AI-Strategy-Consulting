import { createClient } from '@supabase/supabase-js';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const SUPABASE_URL = 'https://ukpqtndwquvlxjmkwyhk.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVrcHF0bmR3cXV2bHhqbWt3eWhrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njk2Nzk0NDMsImV4cCI6MjA4NTI1NTQ0M30.DQ7c7ePSMBLtFwhCt8HRQbl7h7K6JVROt5qSCrdJLr8';
const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { email, password } = req.body;
  // Query the admins table for admin credentials
  const { data, error } = await supabase
    .from('admins')
    .select('*')
    .eq('email', email)
    .eq('password', password)
    .single();

  if (error || !data) {
    return res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
  res.json({ success: true, message: 'Login successful', token: 'dummy-admin-token' });
}
