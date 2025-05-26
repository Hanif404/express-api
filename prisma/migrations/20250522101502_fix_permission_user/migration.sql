/*
  Warnings:

  - The primary key for the `PermissionUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `roleId` on the `PermissionUser` table. All the data in the column will be lost.
  - Added the required column `permissionId` to the `PermissionUser` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE `PermissionUser` DROP FOREIGN KEY `PermissionUser_roleId_fkey`;

-- DropIndex
DROP INDEX `PermissionUser_roleId_fkey` ON `PermissionUser`;

-- AlterTable
ALTER TABLE `PermissionUser` DROP PRIMARY KEY,
    DROP COLUMN `roleId`,
    ADD COLUMN `permissionId` INTEGER NOT NULL,
    ADD PRIMARY KEY (`userId`, `permissionId`);

-- AddForeignKey
ALTER TABLE `PermissionUser` ADD CONSTRAINT `PermissionUser_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
