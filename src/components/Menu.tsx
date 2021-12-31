import Link from 'next/link';
import { useHooks } from './Menu.hook';
import { Button, Menu as MuiMenu, MenuItem } from '@mui/material';
import { FaUserCircle } from 'react-icons/fa';

export const Menu: React.VFC = () => {
  const { signOut, anchorEl, open, onClick, onClose } = useHooks();

  return (
    <>
      <Button
        variant="text"
        id="menu-button"
        aria-controls={open ? 'menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        {...{ onClick }}
      >
        <FaUserCircle size={28} color="white" style={{ cursor: 'pointer' }} />
      </Button>
      <MuiMenu
        id="menu"
        {...{ anchorEl, open, onClose }}
        MenuListProps={{
          'aria-labelledby': 'menu-button',
        }}
      >
        <Link href="/dashboard">
          <MenuItem onClick={onClose}>ダッシュボード</MenuItem>
        </Link>
        <Link href="/settings">
          <MenuItem onClick={onClose}>設定</MenuItem>
        </Link>
        <MenuItem
          onClick={() => {
            onClose();
            signOut();
          }}
        >
          サインアウト
        </MenuItem>
      </MuiMenu>
    </>
  );
};
