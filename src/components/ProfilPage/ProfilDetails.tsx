import React from 'react';

interface ProfilDetailsProps {
  username: string;
  image?: string | null; // L'image peut être undefined ou null si non fournie
  description?: string | null; // La description peut aussi être null si elle n'existe pas
}

const ProfilDetails: React.FC<ProfilDetailsProps> = ({
  username,
  image,
  description,
}) => {
  // Définir une image par défaut si aucune image n'est fournie
  const defaultImage = '/default-avatar.png';

  // Gérer le cas où la description pourrait être nulle ou vide
  const defaultDescription = description || 'Aucune biographie renseignée.';

  return (
    <div className='flex justify-center items-center mt-20 md:mt-32'>
      <div className='w-[90%] md:w-4/5 lg:w-3/4 xl:w-2/3 flex flex-col md:flex-row items-center justify-center space-y-6 md:space-x-8 md:space-y-0'>
        {/* Affichage de l'image */}
        <img
          src={image || '/deco.png'}
          className='w-32 h-32 md:w-24 md:h-24 rounded-full object-cover'
        />
        <div className='text-center md:text-left'>
          <h1 className='text-base md:text-lg text-gray-200'>
            Nom utilisateur : {username}
          </h1>
          <p className='text-sm md:text-lg text-gray-200 mt-2'>
            Biographie : {defaultDescription}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfilDetails;
