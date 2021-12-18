import { sx, css } from '@/utils/css';

export const styles = {
  container: css({
    marginTop: 60,
    width: 400,
    marginInline: 'auto',
    textAlign: 'center',
  }),
  textField: sx({
    width: '100%',
  }),
  select: sx({
    textAlign: 'left',
  }),
  form: css({
    display: 'flex',
    flexDirection: 'column',
  }),
  submitButton: sx({
    color: 'white',
  }),
};
