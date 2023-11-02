import express, { NextFunction, Request, Response } from "express";
import cors from 'cors';
import bodyParser from "body-parser"
import { pagination } from 'typeorm-pagination';
import { router } from './routes';
import { AppError } from "./errors/AppError";

const app = express();

/*app.use((req, res, next) => {
  //Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
  //Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});*/

app.use(cors());
app.use(bodyParser.json({ limit: '100mb' }));
app.use(pagination);
app.use(router);

app.use(
  (err: Error, request: Request, response: Response, _next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        message: err.message
      });
    }

    return response.status(500).json({
      status: "Error",
      message: `Internal server error ${err.message}`,
    });
  }
);

export { app };