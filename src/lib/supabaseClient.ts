import { createClient } from '@supabase/supabase-js';

// Get Supabase credentials from environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://peyolawdogcqlndypnnh.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Form submission interface
export interface FormSubmission {
  platform: string;
  full_name: string;
  work_email: string;
  company_name?: string;
  project_details?: string;
  additional_details?: string;
  llm_provider?: string;
  monthly_spend?: string;
  metadata?: Record<string, any>;
}

// Submit form data to Supabase
export async function submitForm(data: FormSubmission) {
  try {
    const { data: result, error } = await supabase
      .from('form_submissions')
      .insert([
        {
          ...data,
          created_at: new Date().toISOString(),
        },
      ])
      .select();

    if (error) {
      console.error('Supabase error:', error);
      throw new Error(error.message || 'Failed to submit form');
    }

    return { success: true, data: result };
  } catch (error) {
    console.error('Form submission error:', error);
    throw error;
  }
}
