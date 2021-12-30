import { useEffect } from 'react';
import type { NextPage } from 'next';
import { usePage } from './hook';
import { Box, Card, Typography } from '@mui/material';

const Page: NextPage = () => {
  const { lecture } = usePage();

  useEffect(() => {
    console.log(lecture);
  }, [lecture]);

  return (
    <Box p={4}>
      <Card sx={{ p: 4, mx: 'auto', maxWidth: 520 }} elevation={4}>
        <Typography textAlign="center">課題の〆切を追加</Typography>
      </Card>
    </Box>
  );
};

export default Page;
