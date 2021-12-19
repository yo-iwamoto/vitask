import type { NextPage } from 'next';
import { Box, Typography } from '@mui/material';

const Page: NextPage = () => {
  return (
    <Box sx={{ margin: 3 }}>
      <Typography fontSize={32}>プライバシーポリシー</Typography>
      <p>vitask（以下、「本サービス」）では、以下のプライバシーポリシーに基づき、利用者の個人情報を取り扱います。</p>
      <Typography variant="h3" fontSize={24} sx={{ pt: 2 }}>
        1. 個人情報の定義
      </Typography>
      <p>個人情報とは、個人情報保護法にいう「個人情報」を指すものとし、特定の個人を識別できる情報を指します。</p>
      <Typography variant="h3" fontSize={24} sx={{ pt: 2 }}>
        2. 収集する個人情報
      </Typography>
      <p>
        利用目的（後記3.）に記載の目的を達成するために、本サービスが取得する情報は以下のとおりです。これらを複合して使用する場合に個人を識別できる場合には個人情報として扱います。
      </p>
      <ul>
        <li>利用者がフォームに入力する情報</li>
        <li>利用者のメールアドレス</li>
        <li>利用者がGoogleアカウントに関して一般公開している個人情報</li>
      </ul>
      <Typography variant="h3" fontSize={24} sx={{ pt: 2 }}>
        3. 利用目的
      </Typography>
      <ul>
        <li>ユーザーアカウントの作成・管理のため</li>
        <li>サービス改善のため</li>
      </ul>
      <Typography variant="h3" fontSize={24} sx={{ pt: 2 }}>
        4. 個人情報の提供
      </Typography>
      <p>本サービスは、次に挙げる場合を除き、本人の事前の同意なく第三者に個人情報を提供することはありません。</p>
      <ul>
        <li>法令に基づく場合</li>
        <li>あらかじめ同意を得ている場合</li>
      </ul>
      <Typography variant="h3" fontSize={24} sx={{ pt: 2 }}>
        5. お問合せ窓口
      </Typography>
      <p>お問い合わせ窓口 Eメール: you.iwamoto918@gmail.com</p>
      <p>制定日: 2021年12月19日</p>
    </Box>
  );
};

export default Page;
