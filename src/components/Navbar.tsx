'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { buttonVariants } from './ui/button';
import UserAccountnav from './UserAccountnav';
import { useSession } from 'next-auth/react';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const { data: session } = useSession();

  return (
    <div className='bg-zinc-100 py-2 border-b border-zinc-200 fixed w-full mx-auto z-50 top-0 left-0 right-0'>
      <div className='container flex items-center justify-between'>
        {/* LOGO ACCUEIL */}
        <Link
          href='/'
          className='flex items-center text-blue-600 text-xl font-bold'
        >
          AGORA COMMUNITY
        </Link>

        {/* Menu Burger pour mobile */}
        <button
          className='md:hidden text-blue-600 text-xl font-bold'
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? '✖' : '☰'}
        </button>

        {/* Liens Desktop */}
        <div className='hidden md:flex items-center space-x-10 text-lg font-medium'>
          <Link href='/'>Accueil</Link>
          <Link href='/articles'>Articles</Link>
          <Link href='/categories'>Catégories</Link>

          {session?.user?.roles === 'Admin' && (
            <>
              <Link href='/admin'>Liste utilisateurs</Link>
              <Link href='/admin/articles'>Liste articles</Link>
            </>
          )}
        </div>

        {/* Profil & Connexion/Déconnexion (Desktop) */}
        <div className='hidden md:flex items-center space-x-4'>
          {session ? (
            <>
              <Link href='/profil'>
                <Image src='/profil.png' alt='Profil' width={40} height={40} />
              </Link>
              <UserAccountnav />
            </>
          ) : (
            <Link className={buttonVariants()} href='/sign-in'>
              Connexion
            </Link>
          )}
        </div>
      </div>

      {/* Menu Burger (Mobile) */}
      {menuOpen && (
        <div className='fixed top-0 left-0 w-full h-screen bg-zinc-100 flex flex-col items-center justify-center'>
          {/* Logo + Croix */}
          <div className='absolute top-6 left-6 right-6 flex justify-between items-center w-[90%]'>
            <div className='w-full text-center'>
              <Link
                href='/'
                className='text-blue-600 text-2xl font-bold'
                onClick={() => setMenuOpen(false)}
              >
                AGORA COMMUNITY
              </Link>
            </div>
            <button
              className='text-blue-600 text-2xl'
              onClick={() => setMenuOpen(false)}
            >
              ✖
            </button>
          </div>

          {/* Liens centrés */}
          <div className='mt-20 flex flex-col items-center space-y-6 text-lg font-medium'>
            <Link href='/' className='block' onClick={() => setMenuOpen(false)}>
              Accueil
            </Link>
            <Link
              href='/articles'
              className='block'
              onClick={() => setMenuOpen(false)}
            >
              Articles
            </Link>
            <Link
              href='/categories'
              className='block'
              onClick={() => setMenuOpen(false)}
            >
              Catégories
            </Link>

            {session?.user?.roles === 'Admin' && (
              <>
                <Link
                  href='/admin'
                  className='block'
                  onClick={() => setMenuOpen(false)}
                >
                  Liste utilisateurs
                </Link>
                <Link
                  href='/admin/articles'
                  className='block'
                  onClick={() => setMenuOpen(false)}
                >
                  Liste articles
                </Link>
              </>
            )}
          </div>

          {/* Profil & Déconnexion (Mobile) */}
          <div className='mt-10 flex flex-col items-center space-y-6'>
            {session ? (
              <>
                <Link href='/profil' onClick={() => setMenuOpen(false)}>
                  <Image
                    src='/profil.png'
                    alt='Profil'
                    width={40}
                    height={40}
                  />
                </Link>
                <UserAccountnav />
              </>
            ) : (
              <Link
                className={buttonVariants()}
                href='/sign-in'
                onClick={() => setMenuOpen(false)}
              >
                Connexion
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;