import React, { useState } from 'react';
import { useFirebaseAuth } from '@/hooks/useFirebase';
import { useLoading } from '@/hooks/useLoading';
import { signOut as firebaseSignOut } from 'firebase/auth';

export const useHooks = () => {
  const { withLoading } = useLoading();
  const auth = useFirebaseAuth();

  const signOut = () => withLoading(async () => await firebaseSignOut(auth));

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const onClick = (e: React.MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
  const onClose = () => setAnchorEl(null);

  return {
    signOut,
    anchorEl,
    open,
    onClick,
    onClose,
  };
};
