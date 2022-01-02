import { Request, Response } from "express";
import { models } from "@models/index";
import { RestRepository } from "./repository";
import { ParseRequest } from "./interface";
import { BaseError, ErrorCode } from "@utilities/error";

const getClasses = async (req: ParseRequest<{classes: string}>, res: Response) => {
  const classes = req.params.classes;
  const model = models.getModel(classes);
  if (!model) throw new BaseError(ErrorCode.CLASS_NOT_FOUND);
 
  const repository = new RestRepository(model);
  const result = await repository.find(req.query);

  return res.json(result);
};

const getClass = async (req: ParseRequest<{classes: string, id: number}>, res: Response) => {
  const classes = req.params.classes;
  const id = req.params.id;
  const model = models.getModel(classes);
  if (!model) throw new BaseError(ErrorCode.CLASS_NOT_FOUND);
 
  const repository = new RestRepository(model);
  const result = await repository.findByPk(id, req.query);

  return res.json(result);
};

const createClass = async (req: ParseRequest<{classes: string}>, res: Response) => {
  const classes = req.params.classes;
  const body = req.body;
  const model = models.getModel(classes);
  if (!model) throw new BaseError(ErrorCode.CLASS_NOT_FOUND);
 
  const repository = new RestRepository(model);
  const result = await repository.create(body);

  return res.json(result);
};

export { getClasses, getClass, createClass };
