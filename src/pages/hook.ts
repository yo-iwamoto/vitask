import { useRouter } from 'next/router';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { auth, googleAuthProvider } from '@/plugins/firebase';

export const usePage = () => {
  const router = useRouter();

  const { withLoading } = useLoading();

  const { user } = useAuth();

  const signIn = () =>
    withLoading(async () => {
      if (!user) {
        const res = await auth.signInWithPopup(googleAuthProvider).catch((err) => {
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
