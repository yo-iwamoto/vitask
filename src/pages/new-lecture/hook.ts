import { useRouter } from 'next/router';
import { MESSAGES } from '@/const/messages';
import { useAuth } from '@/hooks/useAuth';
import { useFirestore } from '@/hooks/useFirebase';
import { useLoading } from '@/hooks/useLoading';
import { useToast } from '@/hooks/useToast';
import { yupResolver } from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
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
  const { user } = useAuth(true);
  const firestore = useFirestore();

  const { withLoading } = useLoading();

  const { showToast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      if (!user) {
        return;
      }
      const uid = user.uid;

      await addDoc(collection(firestore, 'lectures'), { uid, ...data });

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
