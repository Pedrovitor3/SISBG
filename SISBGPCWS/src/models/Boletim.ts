import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Documents } from './Documents';
import { Bloco } from './Bloco';


@Entity("boletim") 
export class Boletim {

  @PrimaryColumn()
  readonly id: string; 
  
  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  data: string;

  @Column()
  numero: string;
  
  @OneToMany((type)=> Bloco,(bloco) => bloco.boletim, {nullable: true})
  bloco: Bloco[];


  @DeleteDateColumn()
  deleted_at: Date; 

  @CreateDateColumn() 
  created_at: Date;

  @UpdateDateColumn() 
  update_at: Date;

  /*
      A geração do uuID automático não será por meio do SGBD, e sim aqui pelo código
      Utilizando a bilioteca: yarn add uuid
      Tipos da biblioteca uuid: yarn add @tyapes/uuid -D
  */
  constructor() {
    // Se esse ID não existir, gerar um id
    if (!this.id) {
      this.id = uuid();
    }
  }
}