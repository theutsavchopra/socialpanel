import { useSettingsStore } from '@/stores/settingsStore';

interface EmailOptions {
  to: string;
  subject: string;
  body: string;
}

export async function sendEmail({ to, subject, body }: EmailOptions): Promise<void> {
  const { smtpHost, smtpPort, supportEmail } = useSettingsStore.getState().settings;

  try {
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: supportEmail,
        to,
        subject,
        body,
        smtp: {
          host: smtpHost,
          port: smtpPort
        }
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Email sending failed:', error);
    throw new Error('Failed to send email');
  }
}
