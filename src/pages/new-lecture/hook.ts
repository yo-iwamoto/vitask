import { useRouter } from 'next/router';
import { MESSAGES } from '@/const/messages';
import { useAuth } from '@/hooks/useAuth';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';
import { auth, firestore } from '@/lib/firebase';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Form = {
  name: string;
  dayId: number;
  period: number;
};

const schema = yup
  .object()
  .required(MESSAGES.required)
  .shape({
    name: yup.string().required(MESSAGES.required),
    dayId: yup.number().required(MESSAGES.required),
    period: yup.number().required(MESSAGES.required),
  });

export const usePage = () => {
  const router = useRouter();
  useAuth(true);

  const { withLoading } = useLoading();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      const uid = auth.currentUser?.uid;
      if (!uid) return;

      await firestore.collection('lectures').add({ uid, ...data });
      showToast({ severity: 'success', message: '講義を登録しました' });
      router.push('/dashboard');
    })
  );

  return {
    register,
    errors,
    onSubmit,
  };
};
