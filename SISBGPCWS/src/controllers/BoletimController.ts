import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Boletim } from '../models/Boletim';


class BoletimController {
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name,  description, numero, data } = request.body;

    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);
  
    const boletim = resourceBoletimRepository.create({
      name, 
      description,
      numero, 
      data,
    });

    await resourceBoletimRepository.save(boletim);

    return response.status(201).json(boletim);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);

    const all = await resourceBoletimRepository.find({});
    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);
    
    const { id } = request.params;

    const one = await resourceBoletimRepository.findOne({ where: { id: id }
     });
    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, description, numero, data } = request.body;
    const id = request.params.id;

    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);

    const boletim = await resourceBoletimRepository.update({
      id
    }, {
        name,  
        description,
        numero,
        data,
      });
  
    return response.status(200).json(boletim);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);

    let cardToRemove = await resourceBoletimRepository.findOneBy({ id: request.params.id });

    if (!cardToRemove) {
      return response.status(400).json({status: "boletim não encontrado!"});
    }

    const deleteResponse = await resourceBoletimRepository.softDelete(cardToRemove.id);
    if (!deleteResponse.affected) {
      return response.status(400).json({status: "boletim não excluido!"});
    }

    return response.json(cardToRemove);
  }

  async restore(request: Request, response: Response, next: NextFunction) {
  }

  async paginar(request: Request, response: Response, next: NextFunction) {
    const resourceBoletimRepository = APPDataSource.getRepository(Boletim);

    const { perPage, page, column } = request.query;
    const skip = parseInt(page.toString()) * parseInt(perPage.toString());

    const all = await resourceBoletimRepository.createQueryBuilder( 'boletim' )
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

export { BoletimController };