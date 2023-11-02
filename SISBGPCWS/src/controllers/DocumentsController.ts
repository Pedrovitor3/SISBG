import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Documents } from '../models/Documents';


class DocumentsController {
    
    async create(request: Request, response: Response, next: NextFunction) {
        const { name, assunto, bloco, typeDocuments, position, classificacao, data, camada } = request.body;
      
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);
      
        const documents = resourceDocumentsRepository.create({
          name,
          assunto,
          bloco,
          typeDocuments,
          position,
          classificacao,
          data,
          camada,
        });
      
        await resourceDocumentsRepository.save(documents);
      
        return response.status(201).json(documents);
      }
    
    async all(reques: Request, response: Response, next: NextFunction) {
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);

        const all = await resourceDocumentsRepository.find();

        return response.json(all);
    }

    async one(request: Request, response: Response, next: NextFunction){
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);

        const { id } = request.params;

        const one = await resourceDocumentsRepository.findOne({where: {id: id}});

        return response.json(one);
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const { name, assunto, classificacao, bloco, typeDocuments, position, data, camada  } = request.body;
        const id = request.params.id;
      
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);
      
        const documentsFull = await resourceDocumentsRepository.findOne({
          where: { id: id },
        });
      
        if (!documentsFull) {
          return response.status(400).json({ status: "Documentos não encontrada" });
        }
        const docuemnts = await resourceDocumentsRepository.update({
          id
        }, {
          name,
          assunto,
          bloco,
          typeDocuments,
          position,
          data,
          classificacao,
          camada,
          });
      
      
        return response.status(201).json(docuemnts);
      }

    async remove(request: Request, response: Response, next: NextFunction) {
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);

        let documentsToRemove = await resourceDocumentsRepository.findOneBy({id: request.params.id});

        if(!documentsToRemove) {
            return response.status(400).json({status: "Documentos não encontrada!"});
        }

        const deleteResponse = await resourceDocumentsRepository.softDelete(documentsToRemove.id);
        if(!deleteResponse.affected) {
            return response.status(400).json({status: "Documentos não excluida!"});
        }

        return response.json(documentsToRemove);
    }

 
    async paginar(request: Request, response: Response, next: NextFunction){
        const resourceDocumentsRepository = APPDataSource.getRepository(Documents);

        const { perPage, page, column} = request.query;
        const skip = parseInt(page.toString()) * parseInt(perPage.toString());

        const all = await resourceDocumentsRepository.createQueryBuilder('documents')
            .take( parseInt(perPage.toString()) )
            .skip( skip )
            .addOrderBy( column.toString(), 'ASC' )
            .getMany();

        return response.json(all);    
        }

    async token(request: Request, response: Response, next: NextFunction)  {
        const id = 1;
        const token = jwt.sign({id}, process.env.SECRET, {
            expiresIn: 43200,
        });

        return response.json({auth: true, token});
    }
}

export { DocumentsController }