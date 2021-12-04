/* eslint-disable class-methods-use-this */
import { MigrationInterface, QueryRunner, Table } from 'typeorm';

class automovel1638466926719 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(new Table({
      name: 'automovel',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'placa',
          type: 'varchar',
          length: '10',
        },
        {
          name: 'cor',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'marca',
          type: 'varchar',
          length: '50',
        },
        {
          name: 'created_at',
          type: 'datetime',
          default: 'now()',
        },
        {
          name: 'updated_at',
          type: 'datetime',
          default: 'now()',
        },
      ],
    }), true);
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('automovel');
  };
}
export default automovel1638466926719;
