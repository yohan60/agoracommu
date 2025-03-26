-- CreateTable
CREATE TABLE "User" (
    "id_user" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "mail" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roles" TEXT NOT NULL,
    "image" TEXT,
    "description" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id_user")
);

-- CreateTable
CREATE TABLE "Article" (
    "id_article" SERIAL NOT NULL,
    "titre_article" TEXT NOT NULL,
    "description_article" TEXT NOT NULL,
    "image_article" TEXT,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id_article")
);

-- CreateTable
CREATE TABLE "Categorie" (
    "id_categorie" SERIAL NOT NULL,
    "nom_categorie" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Categorie_pkey" PRIMARY KEY ("id_categorie")
);

-- CreateTable
CREATE TABLE "Notification" (
    "id_notification" SERIAL NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id_notification")
);

-- CreateTable
CREATE TABLE "Message" (
    "id_message" SERIAL NOT NULL,
    "description_message" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_notification" INTEGER NOT NULL,
    "id_article" INTEGER NOT NULL,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Message_pkey" PRIMARY KEY ("id_message")
);

-- CreateTable
CREATE TABLE "Like" (
    "id_like" SERIAL NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "id_user" INTEGER NOT NULL,

    CONSTRAINT "Like_pkey" PRIMARY KEY ("id_like")
);

-- CreateTable
CREATE TABLE "Appartenir" (
    "id_article" INTEGER NOT NULL,
    "id_categorie" INTEGER NOT NULL,

    CONSTRAINT "Appartenir_pkey" PRIMARY KEY ("id_article","id_categorie")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_mail_key" ON "User"("mail");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_notification_fkey" FOREIGN KEY ("id_notification") REFERENCES "Notification"("id_notification") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "Article"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_id_user_fkey" FOREIGN KEY ("id_user") REFERENCES "User"("id_user") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appartenir" ADD CONSTRAINT "Appartenir_id_article_fkey" FOREIGN KEY ("id_article") REFERENCES "Article"("id_article") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appartenir" ADD CONSTRAINT "Appartenir_id_categorie_fkey" FOREIGN KEY ("id_categorie") REFERENCES "Categorie"("id_categorie") ON DELETE RESTRICT ON UPDATE CASCADE;
