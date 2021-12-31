import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useFirebaseAuth } from '@/hooks/useFirebase';
import { useLoading } from '@/hooks/useLoading';
import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';

export const usePage = () => {
  const router = useRouter();
  const { withLoading } = useLoading();
  const auth = useFirebaseAuth();

  const { user } = useAuth();

  const signIn = () =>
    withLoading(async () => {
      if (!user) {
        const res = await signInWithPopup(auth, new GoogleAuthProvider()).catch((err) => {
          alert('ログインに失敗しました');
          console.log(err);
        });
        if (!res) return;
      }
      router.push('/dashboard');
    });

  return {
    signIn,
  };
};
