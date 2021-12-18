import type { NextPage } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MESSAGES } from '@/const/messages';
import { Spacer } from '@/components/Spacer';
import { useLoading } from '@/hooks/useLoading';
import { auth } from '@/plugins/firebase';
import { styles } from '@/styles/signup';
import { yupResolver } from '@hookform/resolvers/yup';
import { Button, TextField } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';

type Form = {
  email: string;
  password: string;
};

const schema = yup
  .object()
  .required()
  .shape({
    email: yup.string().required(MESSAGES.required).email('メールアドレスの形式が正しくありません'),
    password: yup.string().min(8, '8文字以上で入力してください').required(MESSAGES.required),
  });

const Page: NextPage = () => {
  const router = useRouter();
  const { withLoading } = useLoading();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Form>({ resolver: yupResolver(schema) });

  const onSubmit = handleSubmit((data) =>
    withLoading(async () => {
      const res = await auth
        .signInWithEmailAndPassword(data.email, data.password)
        .catch((_err) => alert('サインインに失敗しました'));
      if (!res) return;

      router.push('/dashboard');
    })
  );

  return (
    <div style={styles.container}>
      <img src="/copilot.png" height={80} />
      <form onSubmit={onSubmit} style={styles.form}>
        <TextField
          type="email"
          label="メールアドレス"
          sx={styles.textField}
          error={!!errors.email}
          helperText={errors.email?.message ?? ''}
          {...register('email')}
        />
        <Spacer h={20} />
        <TextField
          type="password"
          label="パスワード"
          sx={styles.textField}
          error={!!errors.password}
          helperText={errors.password?.message ?? ''}
          {...register('password')}
        />
        <Spacer h={40} />
        <Button variant="contained" color="primary" type="submit" size="large" sx={styles.button}>
          サインイン
        </Button>
      </form>
      <p>
        はじめて利用する場合は
        <Link href="/signup">サインアップ</Link>
      </p>
    </div>
  );
};

export default Page;
