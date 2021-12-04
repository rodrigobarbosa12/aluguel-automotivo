/* eslint-disable camelcase */
import { Moment } from 'moment';
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from 'typeorm';
import Motoristas from './Motoristas';
import Automovel from './Automovel';

@Entity()
class Utilizacao {
  @PrimaryGeneratedColumn('increment')
    id: number;

  @Column()
    motoristasId: number;

  @Column()
    automovelId: number;

  @CreateDateColumn({ type: 'datetime' })
    dataInicio: Moment;

  @CreateDateColumn({ type: 'datetime', nullable: true, default: null })
    dataTermino: Moment | null;

  @Column({ length: 100 })
    motivoUtilizacao: string;

  @ManyToOne(() => Motoristas, (motoristas) => motoristas.utilizacao)
    motoristas: Motoristas;

  @ManyToOne(() => Automovel, (automovel) => automovel.utilizacao)
    automovel: Automovel;

  @CreateDateColumn({ type: 'datetime' })
    createdAt: Moment;

  @UpdateDateColumn({ type: 'datetime' })
    updatedAt: Moment;
}

export default Utilizacao;
