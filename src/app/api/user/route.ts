import { db } from '@/lib/db';
import { NextResponse } from 'next/server';
import { hash } from 'bcryptjs';
import * as z from 'zod';

// Définir un schema pour la validation des entrées utilisateur
const userSchema = z.object({
  username: z.string().min(1, 'Nom d&apos;utilisateur requis').max(100),
  email: z.string().min(1, 'Email est requis').email('Email invalide'),
  password: z
    .string()
    .min(1, 'Mot de passe requis')
    .min(8, 'Le mot de passe doit avoir 8 caractères minimum'),
});

export async function POST(req: Request) {
  try {
    const body = await req.json(); // Récupère le corps de la requête (données de l'utilisateur)
    const { email, username, password } = userSchema.parse(body); // Valide et extrait les données selon le schema Zod

    // Vérification si l'email existe déjà dans la base de données
    const existingUserByEmail = await db.user.findUnique({
      where: { email: email },
    });
    if (existingUserByEmail) {
      // Si l'email existe, renvoie une erreur 409 (conflit)
      return NextResponse.json(
        { user: null, message: 'Adresse email déjà utilisée' },
        { status: 409 }
      );
    }

    // Vérification si le nom d'utilisateur existe déjà dans la base de données
    const existingUserByUsername = await db.user.findUnique({
      where: { username: username },
    });
    if (existingUserByUsername) {
      // Si le nom d'utilisateur existe, renvoie une erreur 409 (conflit)
      return NextResponse.json(
        { user: null, message: 'Ce nom d&apos;utilisateur est déjà utilisé' },
        { status: 409 }
      );
    }

    // Hashage du mot de passe pour le stocker de manière sécurisée
    const hashedPassword = await hash(password, 10);

    // Création du nouvel utilisateur dans la base de données avec le mot de passe hashé
    const newUser = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword, // Stocke le mot de passe hashé, pas le mot de passe en clair
      },
    });

    // Exclure le mot de passe du nouvel utilisateur pour la sécurité dans la réponse
    const { password: newUserPassword, ...rest } = newUser;

    // Renvoi de la réponse avec les informations de l'utilisateur créé et un statut 201 (créé)
    return NextResponse.json(
      { user: rest, message: 'Utilisateur créé' },
      { status: 201 }
    );
  } catch (error) {
    // En cas d'erreur dans la logique, renvoie une erreur générique avec statut 500
    return NextResponse.json(
      { message: 'Il y a eu une erreur !' },
      { status: 500 }
    );
  }
}
