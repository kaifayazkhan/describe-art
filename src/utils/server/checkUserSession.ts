import { auth } from '@/utils/auth';
import { NextRequest } from 'next/server';

export const checkUserSession = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    throw new Error('Unauthorized - Session not found');
  }

  const userId = session.user.id;

  if (!userId) {
    throw new Error('Unauthorized - User ID not found in session');
  }

  return userId;
};
