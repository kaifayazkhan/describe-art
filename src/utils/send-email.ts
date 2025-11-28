import axios from 'axios';

const RESEND_API_KEY = process.env.RESEND_API_KEY;
const RESEND_FROM_EMAIL = process.env.RESEND_FROM_EMAIL;

if (!RESEND_API_KEY || !RESEND_FROM_EMAIL) {
  throw new Error(
    'Missing required environment variables: RESEND_API_KEY and RESEND_FROM_EMAIL',
  );
}

type EmailInput = {
  email: string;
  subject: string;
  body: string;
};

export const sendEmail = async ({ email, subject, body }: EmailInput) => {
  const payload = {
    from: `Describe Art <${RESEND_FROM_EMAIL}>`,
    to: email,
    subject: subject,
    html: body,
  };
  try {
    const response = await axios.post(
      'https://api.resend.com/emails',
      payload,
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${RESEND_API_KEY}`,
        },
        timeout: 10000,
      },
    );

    if (response.status !== 200) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    throw new Error('Failed to send email', { cause: error });
  }
};
