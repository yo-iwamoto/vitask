type Props = {
  h?: number;
  w?: number;
};

export const Spacer: React.VFC<Props> = ({ h, w }) => {
  if (h !== undefined) {
    return <div style={{ height: `${h}px` }} />;
  } else if (w !== undefined) {
    return <span style={{ display: 'inline-block', width: `${w}px` }} />;
  }
  return <span />;
};
