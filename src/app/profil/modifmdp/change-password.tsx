'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const ChangePassword = () => {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const res = await fetch('/api/auth/password', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });

    const data = await res.json();
    if (!res.ok) {
      setError(data.error);
    } else {
      setSuccess('Mot de passe mis à jour avec succès !');
      setTimeout(() => router.push('/profil'), 2000); // Redirection après succès
    }
  };

  return (
    <div className='w-full h-screen flex items-center justify-center flex-col'>
      {/* Bouton Retour */}
      <div className='w-[90%] md:w-[70%] mx-auto mb-6'>
        <Link
          href='/profil'
          className='w-36 px-4 py-2 rounded-md text-white border border-white hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold block text-center text-[14px]'
        >
          Retour
        </Link>
      </div>

      {/* Formulaire de modification du mot de passe */}
      <div className='w-[90%] md:w-[70%] h-auto md:h-[60%] p-8 md:p-12 bg-gray-800 text-white shadow-md rounded-md flex flex-col justify-center'>
        {error && <p className='text-red-500 text-center'>{error}</p>}
        {success && <p className='text-green-500 text-center'>{success}</p>}

        <form onSubmit={handleSubmit} className='space-y-8 w-full mx-auto'>
          {/* Conteneur des champs*/}
          <div className='flex flex-col md:flex-row md:space-x-8 gap-6'>
            {/* Mot de passe actuel */}
            <div className='flex flex-col w-full md:w-1/2'>
              <label htmlFor='current-password' className='mb-2 text-white'>
                Mot de passe actuel
              </label>
              <input
                type='password'
                id='current-password'
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
                className='w-full p-3 rounded-md bg-white text-black border border-gray-700'
                required
              />
            </div>

            {/* Nouveau mot de passe */}
            <div className='flex flex-col w-full md:w-1/2'>
              <label htmlFor='new-password' className='mb-2 text-white'>
                Confirmer mot de passe
              </label>
              <input
                type='password'
                id='new-password'
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                className='w-full p-3 rounded-md bg-white text-black border border-gray-700'
                required
              />
            </div>
          </div>

          {/* Bouton de soumission */}
          <div className='flex justify-center mt-8'>
            <button
              type='submit'
              className='w-full md:w-auto px-6 py-3 rounded-md hover:text-gray-800 hover:bg-white hover:border-gray-800 hover:font-bold text-white border border-white'
            >
              Modifier le mot de passe
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
