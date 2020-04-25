import {MigrationInterface, QueryRunner} from "typeorm";

export class UpdateEmailUsersTable1587851594857 implements MigrationInterface {
    name = 'UpdateEmailUsersTable1587851594857'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" int PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthdate" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "birthdate") SELECT "id", "name", "birthdate" FROM "users"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`, undefined);
        await queryRunner.query(`CREATE TABLE "temporary_users" ("id" varchar PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthdate" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "temporary_users"("id", "name", "birthdate", "email") SELECT "id", "name", "birthdate", "email" FROM "users"`, undefined);
        await queryRunner.query(`DROP TABLE "users"`, undefined);
        await queryRunner.query(`ALTER TABLE "temporary_users" RENAME TO "users"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" int PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthdate" varchar NOT NULL, "email" varchar NOT NULL, CONSTRAINT "UQ_75180bd8e62d624af9fa502f352" UNIQUE ("email"))`, undefined);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "birthdate", "email") SELECT "id", "name", "birthdate", "email" FROM "temporary_users"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_users"`, undefined);
        await queryRunner.query(`ALTER TABLE "users" RENAME TO "temporary_users"`, undefined);
        await queryRunner.query(`CREATE TABLE "users" ("id" int PRIMARY KEY NOT NULL, "name" varchar NOT NULL, "birthdate" varchar NOT NULL)`, undefined);
        await queryRunner.query(`INSERT INTO "users"("id", "name", "birthdate") SELECT "id", "name", "birthdate" FROM "temporary_users"`, undefined);
        await queryRunner.query(`DROP TABLE "temporary_users"`, undefined);
    }

}
