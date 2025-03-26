-- AlterTable
ALTER TABLE "User" ALTER COLUMN "roles" DROP NOT NULL,
ALTER COLUMN "roles" SET DEFAULT 'Utilisateur';
