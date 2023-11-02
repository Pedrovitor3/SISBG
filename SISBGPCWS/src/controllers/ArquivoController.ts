import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Arquivo } from '../models/Arquivo';


class ArquivoController {
    
    async create(request: Request, response: Response, next: NextFunction) {
        const { base64 ,documents } = request.body;
      
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);
      
        const arquivo = resourceArquivoRepository.create({
          base64,
          documents,
        });
      
        await resourceArquivoRepository.save(arquivo);
      
        return response.status(201).json(arquivo);
      }
    
    async all(reques: Request, response: Response, next: NextFunction) {
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);

        const all = await resourceArquivoRepository.find();

        return response.json(all);
    }

    async one(request: Request, response: Response, next: NextFunction){
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);

        const { id } = request.params;

        const one = await resourceArquivoRepository.findOne({where: {id: id}});

        return response.json(one);
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const { base64, documents } = request.body;
        const id = request.params.id;
      
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);
      
        const arquivoFull = await resourceArquivoRepository.findOne({
          where: { id: id },
        });
      
        if (!arquivoFull) {
          return response.status(400).json({ status: "arquivos não encontrada" });
        }
        const docuemnts = await resourceArquivoRepository.update({
          id
        }, {
          base64, 
          documents,
          });
      
      
        return response.status(201).json(docuemnts);
      }

    async remove(request: Request, response: Response, next: NextFunction) {
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);

        let arquivoToRemove = await resourceArquivoRepository.findOneBy({id: request.params.id});

        if(!arquivoToRemove) {
            return response.status(400).json({status: "arquivos não encontrada!"});
        }

        const deleteResponse = await resourceArquivoRepository.softDelete(arquivoToRemove.id);
        if(!deleteResponse.affected) {
            return response.status(400).json({status: "arquivos não excluida!"});
        }

        return response.json(arquivoToRemove);
    }

 
    async paginar(request: Request, response: Response, next: NextFunction){
        const resourceArquivoRepository = APPDataSource.getRepository(Arquivo);

        const { perPage, page, column} = request.query;
        const skip = parseInt(page.toString()) * parseInt(perPage.toString());

        const all = await resourceArquivoRepository.createQueryBuilder('arquivo')
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

export { ArquivoController }