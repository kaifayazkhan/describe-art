import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { drizzleAdapter } from 'better-auth/adapters/drizzle';
import { db } from '@/drizzle/db';
import { schema } from '@/drizzle/schema';
import { sendEmail } from '@/utils/send-email';

export const auth = betterAuth({
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
    sendResetPassword: async ({ user, url, token }) => {
      await sendEmail({
        email: user.email,
        subject: 'Reset your password',
        body: `<h1> Reset your password </h1> <a href="${url}">Click here to reset your password</a>`,
      });
    },
  },
  emailVerification: {
    sendVerificationEmail: async ({ user, url, token }) => {
      await sendEmail({
        email: user.email,
        subject: 'Verify your email address',
        body: `<h1> Verify your email address</h1> <a href="${url}" rel="noopener noreferrer">Click here to verify</a>`,
      });
    },
  },
  socialProviders: {
    google: {
      prompt: 'select_account',
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    },
  },
  database: drizzleAdapter(db, {
    provider: 'pg',
    schema: {
      ...schema,
      user: schema.user,
    },
  }),
  plugins: [nextCookies()],
});

export type Session = typeof auth.$Infer.Session;
