import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  // Attente des params.id
  const { id } = await params; // Aucune modification nécessaire ici, car `params` est déjà résolu dans la fonction GET.

  const articleId = parseInt(id, 10);

  if (isNaN(articleId)) {
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  try {
    const article = await prisma.article.findUnique({
      where: { id_article: articleId },
      include: {
        user: { select: { username: true, roles: true } }, // Inclure l'utilisateur
        categorie: true, // Inclure la catégorie de l'article si nécessaire
        messages: {
          include: {
            user: { select: { username: true, roles: true } }, // Inclure l'utilisateur des messages
          },
        },
      },
    });

    if (!article) {
      return NextResponse.json(
        { error: 'Article non trouvé' },
        { status: 404 }
      );
    }

    return NextResponse.json(article); // Renvoyer l'article avec ses messages et utilisateurs
  } catch (error) {
    console.error('Erreur lors de la récupération de l&apos;article : ', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
