/* eslint-disable camelcase */
import { Moment } from 'moment';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
} from 'typeorm';
import Utilizacao from './Utilizacao';

@Entity()
class Motoristas {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ length: 60 })
    nome: string;

  @OneToMany(() => Utilizacao, (utilizacao) => utilizacao.motoristas)
    utilizacao: Utilizacao[];

  @CreateDateColumn({ type: 'datetime' })
    created_at: Moment;

  @UpdateDateColumn({ type: 'datetime' })
    updated_at: Moment;
}

export default Motoristas;
