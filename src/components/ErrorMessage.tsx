type Props = {
  children: React.ReactNode;
};

export const ErrorMessage: React.VFC<Props> = ({ children }) => {
  return <p style={{ color: 'red', textAlign: 'left', fontSize: 12 }}>{children}</p>;
};
