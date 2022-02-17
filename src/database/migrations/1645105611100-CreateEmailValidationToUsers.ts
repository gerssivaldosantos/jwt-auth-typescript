import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class CreateEmailValidationToUsers1645105611100 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('users', [
            new TableColumn(
                {
                    name: 'email_token',
                    type: 'varchar',
                    isNullable: true,
                }
            ),
            new TableColumn(
                {
                    name: 'is_validated',
                    type: 'boolean',
                    default: false,
                }
            )
        ],
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users', 'email_token');
        await queryRunner.dropColumn('users', 'is_validated');
    }
}
