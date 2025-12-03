import { auth } from '@/utils/auth';
import { NextRequest } from 'next/server';

export const checkUserSession = async (req: NextRequest) => {
  const session = await auth.api.getSession({
    headers: req.headers,
  });

  if (!session) {
    return null;
  }

  const userId = session.user.id;

  if (!userId) {
    return null;
  }

  return userId;
};
