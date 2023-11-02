import { BeforeInsert, Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, OneToMany, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Documents } from './Documents';
import { Boletim } from './Boletim';


@Entity("bloco") 
export class Bloco {

  @PrimaryColumn()
  readonly id: string; 
  
  @Column()
  name: string;

  @Column() // Ensure uniqueness of the position
  position: string;

  @Column() 
  unidade: string;
  
  @ManyToOne(()=> Boletim,(boletim) => boletim.bloco, {nullable: false, eager: true} )
  boletim: Boletim;

  @OneToMany(()=> Documents,(documents) => documents.bloco, {nullable: true })
  documents: Documents[];

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
 