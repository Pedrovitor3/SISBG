import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Classificacao } from '../models/Classificação';



class ClassificacaoController {
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, description } = request.body;

    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

    const existingType = await resourceClassificacaoRepository.findOne({where:{ name} });

    if (existingType) {
      return response.status(400).json({ status: "Já existe um classificacao com esse nome!" });
    }
    
    const classificacao = resourceClassificacaoRepository.create({
      name,
      description,
    });

    await resourceClassificacaoRepository.save(classificacao);

    return response.status(201).json(classificacao);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

    const all = await resourceClassificacaoRepository.find({

    });

    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);
    
    const { id } = request.params;

    const one = await resourceClassificacaoRepository.findOne({ where: { id: id } });

    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, description} = request.body;
    const id = request.params.id;

    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

   
    const classificacaoFull = await resourceClassificacaoRepository.findOne({
      where: {id:id},
      
    })
  
    if(!classificacaoFull){
      return response.status(400).json({status: "classificacao não encontrada"})
    }

   
    await resourceClassificacaoRepository.save(classificacaoFull);

    const classificacao = await resourceClassificacaoRepository.update({
      id
    }, {
      name,
      description,
    });

    return response.status(201).json(classificacao);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

    let classificacaoToRemove = await resourceClassificacaoRepository.findOneBy({ id: request.params.id });

    if (!classificacaoToRemove) {
      return response.status(400).json({status: "classificacao não encontrada!"});
    }

    const deleteResponse = await resourceClassificacaoRepository.softDelete(classificacaoToRemove.id);
    if (!deleteResponse.affected) {
      return response.status(400).json({status: "classificacao não excluida!"});
    }

    return response.json(classificacaoToRemove);
  }

  async restore(request: Request, response: Response, next: NextFunction) {
    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

    let classificacaoToRestore = await resourceClassificacaoRepository.findOne({ where: { id: request.params.id }, withDeleted: true });

    if (!classificacaoToRestore) {
      return response.status(400).json({status: "classificacao não encontrado!"});
    }
    
    const restoreResponse = await resourceClassificacaoRepository.restore(classificacaoToRestore.id);

    if (restoreResponse.affected) {
      return response.status(200).json({status: "classificacao recuperado!"});
    }

    return response.json(resourceClassificacaoRepository);
  }

  async paginar(request: Request, response: Response, next: NextFunction) {
    const resourceClassificacaoRepository = APPDataSource.getRepository(Classificacao);

    const { perPage, page, column } = request.query;
    const skip = parseInt(page.toString()) * parseInt(perPage.toString());

    const all = await resourceClassificacaoRepository.createQueryBuilder( 'classificacao' )
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

export { ClassificacaoController };