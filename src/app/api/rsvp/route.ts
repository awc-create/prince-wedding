import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";

type RsvpBody = {
  name?: string;
  attending?: string;
  guests?: string;
  dietary?: string;
  message?: string;
};

export async function POST(req: NextRequest) {
  let body: RsvpBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { name, attending, guests, dietary, message } = body;

  if (!name || !attending) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.EMAIL_FROM;
  const notifyTo = process.env.RSVP_NOTIFY_TO;

  if (!apiKey || !from || !notifyTo) {
    console.error("RSVP email not sent — missing RESEND_API_KEY, EMAIL_FROM, or RSVP_NOTIFY_TO env vars.");
    // Don't fail the guest's experience just because env vars aren't configured yet.
    return NextResponse.json({ ok: true, emailed: false });
  }

  try {
    const resend = new Resend(apiKey);
    await resend.emails.send({
      from,
      to: notifyTo,
      subject: `RSVP: ${name} — ${attending === "yes" ? "Attending" : "Declined"}`,
      text: [
        `Name: ${name}`,
        `Attending: ${attending === "yes" ? "Joyfully Accepts" : "Regretfully Declines"}`,
        `Guests: ${guests ?? "1"}`,
        `Dietary notes: ${dietary || "—"}`,
        `Message: ${message || "—"}`
      ].join("\n")
    });
    return NextResponse.json({ ok: true, emailed: true });
  } catch (err) {
    console.error("Failed to send RSVP email:", err);
    return NextResponse.json({ error: "Failed to send" }, { status: 502 });
  }
}
