import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateBusiness1654682750609 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        const table = new Table({
            name: 'businesses',
            columns: [
                {
                    name: 'id',
                    type: 'varchar',
                    length: '255',
                    isPrimary: true,
                    isNullable: false,
                },
                {
                    name: 'name',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: false,
                },
                {
                    name: 'description',
                    type: 'varchar',
                    length: '255',
                    isPrimary: false,
                    isNullable: true,
                },
                {
                    name: 'isActive',
                    type: 'boolean',
                    isNullable: false,
                },
                {
                    name: 'createdAt',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'updatedAt',
                    type: 'date',
                    isNullable: false,
                },
                {
                    name: 'deletedAt',
                    type: 'date',
                    isNullable: true,
                },
            ],
        });
        await queryRunner.createTable(table);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('businesses');
    }
}
