import { useEffect, useState } from 'react';

const checkIsExpired = (expiresAt: string | null) => {
  if (!expiresAt) return false;
  return Date.now() >= new Date(expiresAt).getTime();
};

export const useConversationExpiration = (expiresAt: string | null) => {
  const [isExpired, setIsExpired] = useState(() => checkIsExpired(expiresAt));
  const [prevExpiresAt, setPrevExpiresAt] = useState(expiresAt);

  if (expiresAt !== prevExpiresAt) {
    setPrevExpiresAt(expiresAt);
    setIsExpired(checkIsExpired(expiresAt));
  }

  useEffect(() => {
    if (!expiresAt) return;

    const interval = setInterval(() => {
      setIsExpired(checkIsExpired(expiresAt));
    }, 1000);

    return () => clearInterval(interval);
  }, [expiresAt]);

  return { isExpired };
};
