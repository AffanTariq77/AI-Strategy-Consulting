// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.

// Setup type definitions for built-in Supabase Runtime APIs

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

serve(async (req) => {
  if (req.method === "OPTIONS") {
    // Handle CORS preflight
    return new Response(null, {
      status: 204,
      headers: {
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    });
  }

  const body = await req.json();
  const { platform, name, email, company, details, llmProvider, monthlySpend } = body;
  const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

  await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      from: "onboarding@resend.dev", // Use a verified sender
      to: "affantariq77@gmail.com",
      reply_to: email, // Set reply-to as the user's email
      subject: `New Form Submission from ${platform} 🚀`,
      html: `
        <div style=\"font-family: 'Segoe UI', Arial, sans-serif; background: #f8fafc; padding: 32px; border-radius: 12px; max-width: 600px; margin: 0 auto; box-shadow: 0 2px 8px #0001;\">\n          <h2 style=\"color: #1e293b; font-size: 2rem; margin-bottom: 16px;\">🚀 New Form Submission</h2>\n          <table style=\"width: 100%; border-collapse: collapse; background: #fff; border-radius: 8px; overflow: hidden;\">\n            <tr style=\"background: #f1f5f9;\"><td style=\"padding: 10px 16px; font-weight: bold;\">Platform</td><td style=\"padding: 10px 16px;\">${platform ?? ''}</td></tr>\n            <tr><td style=\"padding: 10px 16px; font-weight: bold;\">Name</td><td style=\"padding: 10px 16px;\">${name ?? ''}</td></tr>\n            <tr style=\"background: #f1f5f9;\"><td style=\"padding: 10px 16px; font-weight: bold;\">Email</td><td style=\"padding: 10px 16px;\"><a href=\"mailto:${email ?? ''}\" style=\"color: #2563eb; text-decoration: underline;\">${email ?? ''}</a></td></tr>\n            <tr><td style=\"padding: 10px 16px; font-weight: bold;\">Company</td><td style=\"padding: 10px 16px;\">${company ?? ''}</td></tr>\n            <tr style=\"background: #f1f5f9;\"><td style=\"padding: 10px 16px; font-weight: bold; vertical-align: top;\">Details</td><td style=\"padding: 10px 16px; white-space: pre-line;\">${details ?? ''}</td></tr>\n            ${llmProvider ? `<tr><td style=\"padding: 10px 16px; font-weight: bold;\">LLM Provider</td><td style=\"padding: 10px 16px;\">${llmProvider}</td></tr>` : ''}\n            ${monthlySpend ? `<tr style=\"background: #f1f5f9;\"><td style=\"padding: 10px 16px; font-weight: bold;\">Monthly Spend</td><td style=\"padding: 10px 16px;\">${monthlySpend}</td></tr>` : ''}\n          </table>\n        </div>`
    })
  });

  return new Response(JSON.stringify({ success: true }), {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
});

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl -i --location --request POST 'http://127.0.0.1:54321/functions/v1/send-notification' \
    --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
    --header 'Content-Type: application/json' \
    --data '{"name":"Functions"}'

*/
