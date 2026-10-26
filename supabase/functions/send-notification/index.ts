// Shared lead-notification function for every AirBridge site.
// Secrets: RESEND_API_KEY, NOTIFY_EMAIL (lead inbox), RESEND_FROM_EMAIL (sender on a Resend-verified domain).

import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, apikey, x-client-info",
}

const json = (status: number, payload: unknown) =>
  new Response(JSON.stringify(payload), { status, headers: { ...corsHeaders, "Content-Type": "application/json" } })

const escapeHtml = (value: string) =>
  value.replace(/[&<>"']/g, (char) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[char] as string))

const row = (label: string, value: string, shaded: boolean) =>
  `<tr style="background:${shaded ? "#f1f5f9" : "#fff"};"><td style="padding:10px 16px;font-weight:bold;vertical-align:top;white-space:nowrap;">${escapeHtml(label)}</td><td style="padding:10px 16px;white-space:pre-line;">${escapeHtml(value)}</td></tr>`

const isEmail = (value: unknown): value is string => typeof value === "string" && /^[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+$/.test(value)

// The main site and landing pages post flat fields; food-tech posts { kind, subject, fields }
// deno-lint-ignore no-explicit-any
const flatFields = (b: any): Record<string, unknown> => ({
  Platform: b.platform,
  Name: b.name || [b.firstName, b.lastName].filter(Boolean).join(" "),
  Email: b.email,
  Company: b.company,
  Subject: b.subject,
  Message: b.message,
  Details: b.details,
  "LLM Provider": b.llmProvider,
  "Monthly Spend": b.monthlySpend,
})

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 204, headers: corsHeaders })
  }

  try {
    const body = await req.json()
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY")
    const NOTIFY_EMAIL = Deno.env.get("NOTIFY_EMAIL")
    const FROM_EMAIL = Deno.env.get("RESEND_FROM_EMAIL")
    if (!RESEND_API_KEY || !NOTIFY_EMAIL || !FROM_EMAIL) {
      return json(500, { error: "RESEND_API_KEY, NOTIFY_EMAIL and RESEND_FROM_EMAIL must be set" })
    }

    let to: string, subject: string, fields: Record<string, unknown>, replyTo: unknown
    if (body.kind === "ackVisitor") {
      // Fixed wording, so the public anon key can't be used to send arbitrary email to arbitrary people
      if (!isEmail(body.to)) return json(400, { error: "Invalid recipient" })
      to = body.to
      subject = "We've got your quote request"
      fields = { Message: "Thanks, we received your quote request. We reply the same working day." }
      replyTo = NOTIFY_EMAIL
    } else {
      to = NOTIFY_EMAIL
      subject = body.fields ? String(body.subject ?? "New enquiry") : `New Form Submission from ${body.platform ?? "website"}`
      fields = body.fields ?? flatFields(body)
      replyTo = body.replyTo ?? body.email
    }

    const rowsHtml = Object.entries(fields)
      .filter(([, value]) => value !== undefined && value !== null && value !== "")
      .map(([label, value], i) => row(label, String(value), i % 2 === 0))
      .join("")

    const html = `
      <div style="font-family:'Segoe UI',Arial,sans-serif;background:#f8fafc;padding:32px;border-radius:12px;max-width:600px;margin:0 auto;">
        <h2 style="color:#1e293b;font-size:1.5rem;margin-bottom:16px;">${escapeHtml(subject)}</h2>
        <table style="width:100%;border-collapse:collapse;background:#fff;border-radius:8px;overflow:hidden;">${rowsHtml}</table>
      </div>`

    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: FROM_EMAIL,
        to,
        ...(isEmail(replyTo) ? { reply_to: replyTo } : {}),
        subject: subject.replace(/[\r\n]+/g, " ").slice(0, 200),
        html,
      }),
    })

    if (!resendResponse.ok) {
      const errorText = await resendResponse.text()
      console.error("Resend error:", resendResponse.status, errorText)
      return json(502, { error: `Resend error: ${errorText}` })
    }

    return json(200, { success: true })
  } catch (error) {
    console.error("send-notification failed:", error)
    return json(500, { error: error instanceof Error ? error.message : "Unknown error" })
  }
})
