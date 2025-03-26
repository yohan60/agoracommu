'use client';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import { Button } from './ui/button';

const UserAccountNav = () => {
  return (
    <Button
      onClick={() =>
        signOut({
          redirect: true,
          callbackUrl: `${window.location.origin}/sign-in`,
        })
      }
      variant='ghost'
      title='Se déconnecter'
    >
      <Image src='/deco.png' alt='Se déconnecter' width={26} height={26} />
    </Button>
  );
};

export default UserAccountNav;