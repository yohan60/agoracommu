// app/api/admin/admin-users/route.ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const userId = url.searchParams.get('id'); // Récupère l'ID de l'utilisateur depuis l'URL

    if (!userId) {
      return new Response(
        JSON.stringify({ error: 'ID de l&apos;utilisateur manquant' }),
        { status: 400 }
      );
    }

    // Supprimer l'utilisateur par son ID
    await prisma.user.delete({
      where: { id_user: parseInt(userId) },
    });

    return new Response(
      JSON.stringify({ message: 'Utilisateur supprimé avec succès' }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        error: 'Erreur lors de la suppression de l&apos;utilisateur',
      }),
      { status: 500 }
    );
  }
}