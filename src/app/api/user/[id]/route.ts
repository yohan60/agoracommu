import { NextResponse } from 'next/server'; // Utilisation de NextResponse pour gérer les réponses API
import { db } from '@/lib/db'; // Importation de la base de données configurée

export async function GET(req: Request, { params }: { params: { id: string } }) {
  // Récupérer l'ID depuis les paramètres de l'URL
  const id = parseInt(params.id, 10); // Conversion de l'ID en entier

  // Vérification si l'ID est un nombre valide
  if (isNaN(id)) {
    // Si l'ID n'est pas valide, renvoie une erreur 400 (Bad Request)
    return NextResponse.json({ error: 'ID invalide' }, { status: 400 });
  }

  // Recherche de l'utilisateur dans la base de données par son ID
  const user = await db.user.findUnique({
    where: { id_user: id }, // Recherche avec l'ID
    select: {
      id_user: true, // Sélectionne l'ID de l'utilisateur
      username: true, // Sélectionne le nom d'utilisateur
      image: true, // Sélectionne l'image de l'utilisateur
      description: true, // Sélectionne la description de l'utilisateur
    },
  });

  // Si aucun utilisateur n'est trouvé avec cet ID
  if (!user) {
    // Si l'utilisateur n'existe pas, renvoie une erreur 404 (non trouvé)
    return NextResponse.json({ error: 'Utilisateur non trouvé' }, { status: 404 });
  }

  // Si l'utilisateur est trouvé, renvoie ses informations sous forme de JSON
  return NextResponse.json(user);
}
