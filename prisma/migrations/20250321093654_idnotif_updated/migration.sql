-- DropForeignKey
ALTER TABLE "Message" DROP CONSTRAINT "Message_id_notification_fkey";

-- AlterTable
ALTER TABLE "Message" ALTER COLUMN "id_notification" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Message" ADD CONSTRAINT "Message_id_notification_fkey" FOREIGN KEY ("id_notification") REFERENCES "Notification"("id_notification") ON DELETE SET NULL ON UPDATE CASCADE;
