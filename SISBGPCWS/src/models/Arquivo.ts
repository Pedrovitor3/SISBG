import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid';
import { Documents } from './Documents';
import { Bloco } from './Bloco';


@Entity("arquivo") 
export class Arquivo {

  @PrimaryColumn()
  readonly id: string; 
  
  @Column({type: "text", nullable: true})
  base64: string;
  
  @ManyToOne(()=> Documents,(doc) => doc.arquivos, {nullable: false} )
  documents: Documents;


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
