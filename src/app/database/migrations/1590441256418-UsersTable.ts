import { MigrationInterface, QueryRunner } from 'typeorm'

export class UsersTable1590441256418 implements MigrationInterface {
	name = 'UsersTable1590441256418'

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			"CREATE TABLE `users` (`id` int NOT NULL AUTO_INCREMENT, `name` varchar(255) NOT NULL, `email` varchar(255) NOT NULL, `password` varchar(255) NOT NULL, `photo` varchar(255) NOT NULL DEFAULT '', `photoUrl` varchar(255) NOT NULL DEFAULT '', `createdAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), `updatedAt` timestamp(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), UNIQUE INDEX `IDX_97672ac88f789774dd47f7c8be` (`email`), PRIMARY KEY (`id`)) ENGINE=InnoDB",
			undefined
		)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(
			'DROP INDEX `IDX_97672ac88f789774dd47f7c8be` ON `users`',
			undefined
		)
		await queryRunner.query('DROP TABLE `users`', undefined)
	}
}
