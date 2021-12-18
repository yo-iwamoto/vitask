import { css, sx } from '@/utils/css';

export const styles = {
  container: css({
    marginTop: 60,
    width: 400,
    marginInline: 'auto',
    textAlign: 'center',
  }),
  form: css({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginInline: 20,
  }),
  textField: sx({
    width: '100%',
  }),
  button: sx({
    color: 'white',
    fontWeight: 'bold',
  }),
};
