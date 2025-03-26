import React from 'react';

// Définition des props attendues par le composant ArticleHeader
interface ArticleHeaderProps {
  title: string;
  username: string;
  roles: string;
}

// Composant ArticleHeader
const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  title,
  username,
  roles,
}) => (
  <div className='mb-4'>
    {' '}
    {/* Conteneur du header de l'article*/}
    {/* Titre de l'article */}
    <h1 className='text-3xl font-bold'>{title}</h1>
    {/* Informations sur l'auteur de l'article */}
    <p className='text-sm text-gray-400'>
      Écrit par : {/* Texte indiquant que l'article a été écrit par */}
      {/* Affichage du nom d'utilisateur et du rôle de l'auteur */}
      <span className='text-lg font-bold text-blue-400 ml-2'>
        {username} - {roles}{' '}
        {/* Nom d'utilisateur et rôle avec mise en forme */}
      </span>
    </p>
  </div>
);

export default ArticleHeader;