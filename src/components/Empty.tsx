import Image from 'next/image';

type Props = {
  children?: React.ReactNode;
};

export const Empty: React.VFC<Props> = ({ children }) => {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'center' }}>
      <span>
        <Image src="/empty.png" width={300} height={300} />
      </span>
      <p>{children}</p>
    </div>
  );
};
