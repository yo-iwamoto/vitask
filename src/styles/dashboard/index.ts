import { sx, css } from '@/utils/css';

export const styles = {
  container: css({
    marginTop: 32,
    marginInline: 20,
  }),
  hr: css({
    marginTop: 40,
    marginBottom: 40,
  }),
  add: sx({
    color: 'white',
  }),
  report: css({
    display: 'flex',
    justifyContent: 'space-between',
    cursor: 'pointer',
  }),
  date: css({
    letterSpacing: 3,
  }),
  lecture: css({
    display: 'flex',
    justifyContent: 'space-between',
  }),
};
