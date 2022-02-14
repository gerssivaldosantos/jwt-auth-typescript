import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1644852117538 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            /* Extesion installation for use in "id" column, 
            this can do automatic uuid creation */
            'CREATE EXTENSION IF NOT EXISTS "uuid-ossp";'
        )
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name : "id",
                        type: "uuid",
                        isPrimary: true,
                        generationStrategy: "uuid",
                        default: 'uuid_generate_v4()'

                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true
                    },
                    {
                        name: "password",
                        type: "varchar"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(
            'users'
        )
        await queryRunner.query('DROP EXTESION "uuid-ossp"')
    }

}
