import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { TypeDocuments } from '../models/TypeDocuments';



class TypeDocumentsController {
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, sigla } = request.body;

    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

    const existingType = await resourceTypeDocumentsRepository.findOne({where:{ name} });

    if (existingType) {
      return response.status(400).json({ status: "Já existe um tipo de documento com esse nome!" });
    }
    
    const typeDocuments = resourceTypeDocumentsRepository.create({
      name,
      sigla,
    });

    await resourceTypeDocumentsRepository.save(typeDocuments);

    return response.status(201).json(typeDocuments);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

    const all = await resourceTypeDocumentsRepository.find({

    });

    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);
    
    const { id } = request.params;

    const one = await resourceTypeDocumentsRepository.findOne({ where: { id: id } });

    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, sigla} = request.body;
    const id = request.params.id;

    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

   
    const typeDocumentsFull = await resourceTypeDocumentsRepository.findOne({
      where: {id:id},
      
    })
  
    if(!typeDocumentsFull){
      return response.status(400).json({status: "tipo de documento não encontrada"})
    }

   
    await resourceTypeDocumentsRepository.save(typeDocumentsFull);

    const typeDocuments = await resourceTypeDocumentsRepository.update({
      id
    }, {
      name,
      sigla,
    });

    return response.status(201).json(typeDocuments);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

    let typeDocumentsToRemove = await resourceTypeDocumentsRepository.findOneBy({ id: request.params.id });

    if (!typeDocumentsToRemove) {
      return response.status(400).json({status: "tipo de documento não encontrada!"});
    }

    const deleteResponse = await resourceTypeDocumentsRepository.softDelete(typeDocumentsToRemove.id);
    if (!deleteResponse.affected) {
      return response.status(400).json({status: "tipo de documento não excluida!"});
    }

    return response.json(typeDocumentsToRemove);
  }

  async restore(request: Request, response: Response, next: NextFunction) {
    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

    let typeDocumentsToRestore = await resourceTypeDocumentsRepository.findOne({ where: { id: request.params.id }, withDeleted: true });

    if (!typeDocumentsToRestore) {
      return response.status(400).json({status: "tipo de documento não encontrado!"});
    }
    
    const restoreResponse = await resourceTypeDocumentsRepository.restore(typeDocumentsToRestore.id);

    if (restoreResponse.affected) {
      return response.status(200).json({status: "tipo de documento recuperado!"});
    }

    return response.json(resourceTypeDocumentsRepository);
  }

  async paginar(request: Request, response: Response, next: NextFunction) {
    const resourceTypeDocumentsRepository = APPDataSource.getRepository(TypeDocuments);

    const { perPage, page, column } = request.query;
    const skip = parseInt(page.toString()) * parseInt(perPage.toString());

    const all = await resourceTypeDocumentsRepository.createQueryBuilder( 'typeDocuments' )
      .take( parseInt(perPage.toString()) )
      .skip( skip )
      .addOrderBy( column.toString(), 'ASC' )
      .getMany();

    return response.json(all);
  }
  

  async token(request: Request, response: Response, next: NextFunction) {
    const id = 1;
    const token = jwt.sign({ id }, process.env.SECRET, {
      expiresIn: 43200,
    });

    return response.json({ auth: true, token });
  }

}

export { TypeDocumentsController };