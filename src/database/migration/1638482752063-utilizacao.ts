/* eslint-disable class-methods-use-this */
import {
  MigrationInterface, QueryRunner, Table, TableForeignKey,
} from 'typeorm';

class utilizacao1638482752063 implements MigrationInterface {
  up = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.createTable(new Table({
      name: 'utilizacao',
      columns: [
        {
          name: 'id',
          type: 'integer',
          isPrimary: true,
          isGenerated: true,
          generationStrategy: 'increment',
        },
        {
          name: 'motoristas_id',
          type: 'integer',
        },
        {
          name: 'automovel_id',
          type: 'integer',
        },
        {
          name: 'data_inicio',
          type: 'datetime',
          default: 'now()',
        },
        {
          name: 'data_termino',
          type: 'datetime',
          default: null,
          isNullable: true,
        },
        {
          name: 'motivo_utilizacao',
          type: 'varchar',
          length: '100',
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
    }),
    true,
    true);

    await queryRunner.createForeignKey('utilizacao', new TableForeignKey({
      columnNames: ['motoristas_id'],
      referencedTableName: 'motoristas',
      referencedColumnNames: ['id'],
    }));

    await queryRunner.createForeignKey('utilizacao', new TableForeignKey({
      columnNames: ['automovel_id'],
      referencedTableName: 'automovel',
      referencedColumnNames: ['id'],
    }));
  };

  down = async (queryRunner: QueryRunner): Promise<void> => {
    await queryRunner.dropTable('utilizacao');
  };
}
export default utilizacao1638482752063;
