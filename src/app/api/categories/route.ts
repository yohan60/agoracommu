import { db } from '@/lib/db';

export async function POST(req: Request) {
  try {
    const { nom_categorie } = await req.json();

    // Vérification que le nom de la catégorie est valide
    if (!nom_categorie || nom_categorie.trim() === '') {
      return new Response(
        JSON.stringify({ error: 'Le nom de la catégorie est requis' }),
        { status: 400 }
      );
    }

    // Création de la catégorie dans la base de données
    const newCategory = await db.categorie.create({
      data: {
        nom_categorie,
      },
    });

    return new Response(
      JSON.stringify({
        success: 'Catégorie créée avec succès',
        category: newCategory,
      }),
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Erreur lors de la création de la catégorie :', error);
    return new Response(
      JSON.stringify({
        error: 'Erreur interne du serveur',
        details: error.message,
      }),
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    // Récupérer toutes les catégories de la base de données
    const categories = await db.categorie.findMany();
    return new Response(JSON.stringify(categories), { status: 200 });
  } catch (error) {
    console.error('Erreur lors de la récupération des catégories :', error);
    return new Response(
      JSON.stringify({ error: 'Erreur interne du serveur' }),
      { status: 500 }
    );
  }
}