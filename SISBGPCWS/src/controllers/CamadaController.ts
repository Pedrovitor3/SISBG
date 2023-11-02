import { NextFunction, Request, Response } from 'express';
import * as yup from 'yup';
import { APPDataSource } from '../database/data-source';
import jwt from 'jsonwebtoken';
import { Camada } from '../models/camada';



class CamadaController {
  
  async create(request: Request, response: Response, next: NextFunction) {
    
    const { name, sigla } = request.body;

    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

    const camada = resourceCamadaRepository.create({
      name,
      sigla,
    });

    await resourceCamadaRepository.save(camada);

    return response.status(201).json(camada);
  }

  async all(request: Request, response: Response, next: NextFunction) {
    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

    const all = await resourceCamadaRepository.find({

    });

    return response.json(all);
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const resourceCamadaRepository = APPDataSource.getRepository(Camada);
    
    const { id } = request.params;

    const one = await resourceCamadaRepository.findOne({ where: { id: id } });

    return response.json(one);
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const { name, sigla} = request.body;
    const id = request.params.id;

    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

   
    const camadaFull = await resourceCamadaRepository.findOne({
      where: {id:id},
      
    })
  
    if(!camadaFull){
      return response.status(400).json({status: "camada não encontrada"})
    }

   
    await resourceCamadaRepository.save(camadaFull);

    const camada = await resourceCamadaRepository.update({
      id
    }, {
      name,
      sigla,
    });

    return response.status(201).json(camada);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

    let camadaToRemove = await resourceCamadaRepository.findOneBy({ id: request.params.id });

    if (!camadaToRemove) {
      return response.status(400).json({status: "camada não encontrada!"});
    }

    const deleteResponse = await resourceCamadaRepository.softDelete(camadaToRemove.id);
    if (!deleteResponse.affected) {
      return response.status(400).json({status: "camada não excluida!"});
    }

    return response.json(camadaToRemove);
  }

  async restore(request: Request, response: Response, next: NextFunction) {
    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

    let camadaToRestore = await resourceCamadaRepository.findOne({ where: { id: request.params.id }, withDeleted: true });

    if (!camadaToRestore) {
      return response.status(400).json({status: "camada não encontrado!"});
    }
    
    const restoreResponse = await resourceCamadaRepository.restore(camadaToRestore.id);

    if (restoreResponse.affected) {
      return response.status(200).json({status: "camada recuperado!"});
    }

    return response.json(resourceCamadaRepository);
  }

  async paginar(request: Request, response: Response, next: NextFunction) {
    const resourceCamadaRepository = APPDataSource.getRepository(Camada);

    const { perPage, page, column } = request.query;
    const skip = parseInt(page.toString()) * parseInt(perPage.toString());

    const all = await resourceCamadaRepository.createQueryBuilder( 'camada' )
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

export { CamadaController };