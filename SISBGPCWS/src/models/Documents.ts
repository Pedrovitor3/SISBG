import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, JoinTable, ManyToMany,  ManyToOne,  OneToMany, OneToOne, PrimaryColumn, UpdateDateColumn } from "typeorm";
import { v4 as uuid } from 'uuid'; 
import { Boletim } from './Boletim';
import { TypeDocuments } from './TypeDocuments';
import { Bloco } from './Bloco';
import { Classificacao } from './Classificação';
import { Camada } from './camada';
import { Arquivo } from './Arquivo';


@Entity("documents")
export class Documents {
    @PrimaryColumn()
    readonly id: string;

    @Column({nullable: true})
    name: string;

    @Column({nullable: true})
    assunto: string;

    @Column()
    position: number;
    
    @Column({nullable: true})
    data: string;


    @OneToMany(() => Arquivo, (imagens) => imagens.documents, {nullable: true, eager: true})
    arquivos: Arquivo

    @ManyToOne(()=> Bloco,(bloco) => bloco.documents, {nullable: false, eager: true} )
    bloco: Bloco;
  
    @ManyToOne(()=> TypeDocuments, (typeDocuments) => typeDocuments.documents, {nullable: true, eager: true} )
    typeDocuments: TypeDocuments;

    @ManyToOne(()=> Camada, (camada) => camada.documents, {nullable: true, eager: true} )
    camada: Camada;
   
    @ManyToOne(()=> Classificacao, (classificacao) => classificacao.documents, {nullable: true, eager: true} )
    classificacao: Classificacao;
   


    @DeleteDateColumn()
    deleted_at: Date;

    @CreateDateColumn() // Para já capturar a data e fazer a formatação
    created_at: Date;

    @UpdateDateColumn() // Para já capturar a data e fazer a formatação
    update_at: Date;



    constructor() {
        // Se esse ID não existir, gerar um id
        if (!this.id) {
          this.id = uuid();
        }
      }
}