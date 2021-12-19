import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { MESSAGES } from '@/const/messages';
import { useAuth } from '@/hooks/useAuth';
import { useFormWithYup } from '@/hooks/useFormWithYup';
import { useLectures } from '@/hooks/useLectures';
import { useLoading } from '@/hooks/useLoading';
import { dayjs } from '@/plugins/dayjs';
import { firestore } from '@/plugins/firebase';
import * as yup from 'yup';

type Form = {
  lectureId: string;
  name: string;
  deadlineDate: string;
  deadlineTime: string;
  notification: number;
};

const schema = yup
  .object()
  .required(MESSAGES.required)
  .shape({
    lectureId: yup.string().required(MESSAGES.required),
    name: yup.string().required(MESSAGES.required),
    deadlineDate: yup.string().required(MESSAGES.required),
    deadlineTime: yup.string().required(MESSAGES.required),
    notification: yup.number().required(MESSAGES.required).default(1),
  });

export const usePage = () => {
  const router = useRouter();
  const { user } = useAuth(true);
  const { withLoading } = useLoading();

  const { data: lectures } = useLectures();

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    formState: { errors },
  } = useFormWithYup<Form>(schema);

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      if (!user) return;

      const deadline = new Date(data.deadlineDate);
      deadline.setHours(Number(data.deadlineTime.slice(0, 2)));
      deadline.setMinutes(Number(data.deadlineTime.slice(3)));

      const lectureName = lectures?.find((l) => l.id === data.lectureId)?.name;
      if (!lectureName) return;

      await firestore.collection('reports').add({
        uid: user.uid,
        deadline,
        name: data.name,
        lectureId: data.lectureId,
        lectureName,
      });

      router.push('/dashboard');
    })
  );

  useEffect(() => {
    if (lectures?.length === 0) {
      setError('lectureId', { message: '選択できる授業がありません' });
    }
  }, [lectures]);

  useEffect(() => {
    const today = dayjs(new Date());
    setValue('deadlineDate', today.format('YYYY-MM-DD'));
    setValue('deadlineTime', today.format('HH:mm'));
  });

  return {
    lectures,
    register,
    errors,
    onSubmit,
  };
};
