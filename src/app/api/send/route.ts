// src/app/api/send/route.ts
import { EmailTemplate } from '@/components/email-template';
import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, message } = body;

    // Log data to check if env vars are loaded (DO NOT share keys in public logs)
    if (!process.env.RESEND_API_KEY) {
      throw new Error("Missing RESEND_API_KEY");
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: [process.env.MY_EMAIL as string],
      subject: `New message from ${name}`,
      react: await EmailTemplate({ name, email, message }),
    });

    if (data.error) {
        // Resend specific error check
        throw new Error(data.error.message);
    }

    return NextResponse.json(data);
  } catch (error) {
    // THIS IS THE FIX: Log the actual error to your terminal
    console.error("❌ API Error Details:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}