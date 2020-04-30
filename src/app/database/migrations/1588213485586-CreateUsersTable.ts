import {MigrationInterface, QueryRunner} from "typeorm";

export class CreateUsersTable1588213485586 implements MigrationInterface {
    name = 'CreateUsersTable1588213485586'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "birthdate"`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "users" ADD "birthdate" TIMESTAMP NOT NULL DEFAULT now()`, undefined);
    }

}
