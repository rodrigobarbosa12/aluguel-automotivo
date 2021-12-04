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
class Automovel {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column({ length: 10 })
    placa: string;

  @Column({ length: 50 })
    cor: string;

  @Column({ length: 50 })
    marca: string;

  @OneToMany(() => Utilizacao, (utilizacao) => utilizacao.motoristas)
    utilizacao: Utilizacao[];

  @CreateDateColumn({ type: 'datetime' })
    created_at: Moment;

  @UpdateDateColumn({ type: 'datetime' })
    updated_at: Moment;
}

export default Automovel;
