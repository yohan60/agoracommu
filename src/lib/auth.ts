import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { db } from "./db";
import { compare } from "bcryptjs";

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt", // Utilisation du JWT pour la gestion de session
  },
  pages: {
    signIn: "/sign-in", // Redirection vers la page de connexion personnalisée
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email", placeholder: "john@mail.com" },
        password: { label: "Mot de passe", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email et mot de passe requis");
        }

        const existingUser = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!existingUser) {
          throw new Error("Utilisateur non trouvé");
        }

        const passwordMatch = await compare(
          credentials.password,
          existingUser.password
        );
        if (!passwordMatch) {
          throw new Error("Mot de passe incorrect");
        }

        // Retourne l'utilisateur avec l'id et les rôles
        return {
          id: String(existingUser.id_user), // `id_user` converti en string
          username: existingUser.username,
          email: existingUser.email,
          roles: existingUser.roles, // Assure-toi que `roles` existe dans ta table User
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        // Ajout de l'id et des informations utilisateur dans le JWT
        token.id = user.id;
        token.roles = user.roles || "user"; // Valeur par défaut "user" si aucun rôle n'est défini
        token.username = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string; // Ajout de l'id dans la session
        session.user.roles = token.roles as string; // Ajout du rôle dans la session
        session.user.username = token.username as string; // Ajout du username dans la session
      }
      return session;
    },
  },
};