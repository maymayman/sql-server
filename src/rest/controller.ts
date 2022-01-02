import { Request, Response } from "express";
import { models } from "@models/index";
import { RestRepository } from "./repository";
import { ParseRequest } from "./interface";
import { BaseError, ErrorCode } from "@utilities/error";

const getEntities = async (req: ParseRequest<{classes: string}>, res: Response) => {
  const classes = req.params.classes;
  const model = models.getModel(classes);
  if (!model) throw new BaseError(ErrorCode.ENTITY_NOT_FOUND);
 
  const repository = new RestRepository(model);
  const results = await repository.find(req.query);

  return res.json(results)
};

export { getEntities, };
