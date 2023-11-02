import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Bloco } from '../models/Bloco';


class BlocoController {
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, boletim, position, unidade } = request.body;

    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);

    const bloco = resourceBlocoRepository.create({
      name,
      boletim,
      position,
      unidade,
    });

    await resourceBlocoRepository.save(bloco);

    return response.status(201).json(bloco);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);

    const all = await resourceBlocoRepository.find({});
    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);
    
    const { id } = request.params;

    const one = await resourceBlocoRepository.findOne({ where: { id: id }
     });
    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, boletim, position, unidade } = request.body;
    const id = request.params.id;

    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);
  

    const bloco = await resourceBlocoRepository.update({
      id
    }, {
        name,  
        boletim,
        position,
        unidade,
      });
  
    return response.status(200).json(bloco);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);

    let cardToRemove = await resourceBlocoRepository.findOneBy({ id: request.params.id });

    if (!cardToRemove) {
      return response.status(400).json({status: "bloco não encontrado!"});
    }

    const deleteResponse = await resourceBlocoRepository.softDelete(cardToRemove.id);
    if (!deleteResponse.affected) {
      return response.status(400).json({status: "bloco não excluido!"});
    }

    return response.json(cardToRemove);
  }

  async restore(request: Request, response: Response, next: NextFunction) {
  }

  async paginar(request: Request, response: Response, next: NextFunction) {
    const resourceBlocoRepository = APPDataSource.getRepository(Bloco);

    const { perPage, page, column } = request.query;
    const skip = parseInt(page.toString()) * parseInt(perPage.toString());

    const all = await resourceBlocoRepository.createQueryBuilder( 'bloco' )
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

export { BlocoController };