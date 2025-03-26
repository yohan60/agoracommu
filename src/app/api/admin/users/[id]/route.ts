import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma'; // Assure-toi que tu as un client Prisma configuré

export async function DELETE(request: Request, { params }: {params: Promise<{ id: string }> }) {
  const { id } = await params; // Récupération de l'id depuis les paramètres de la route dynamique

  try {
    // Mise à jour de l'utilisateur pour le bannir (changer son rôle à 'Banni')
    const user = await prisma.user.update({
      where: { id_user: parseInt(id, 10) }, // Utilisation de l'ID de l'utilisateur (converti en nombre)
      data: { roles: 'Banni' }, // Mettre à jour le rôle de l'utilisateur
    });

    return NextResponse.json(user); // Retourne l'utilisateur mis à jour
  } catch (error) {
    console.error('Erreur lors de la mise à jour de l&apos;utilisateur', error);
    return NextResponse.json({ error: 'Erreur serveur' }, { status: 500 });
  }
}
