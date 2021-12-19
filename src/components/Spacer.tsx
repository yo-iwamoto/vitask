import { Box } from '@mui/material';

type Props = { h: number } | { w: number };

export const Spacer: React.VFC<Props> = (props) => {
  return <Box sx={'h' in props ? { height: `${props.h}px` } : { display: 'inline-block', width: `${props.w}px` }} />;
};
