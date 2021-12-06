import { Request, Response } from "express";
import { models } from "@models/index";
import { RestRepository } from "./repository";
import { ParseRequest } from "./interface";

const getEntities = async (req: ParseRequest<{classes: string}>, res: Response) => {
  const classes = req.params.classes;
  const model = models.getModel(classes);
  const findOptions = RestRepository.parseQuery(req.query);
  const repository = new RestRepository(model);
  const results = await repository.find(findOptions);

  return res.json(results)
};

export {
  getEntities,
};
