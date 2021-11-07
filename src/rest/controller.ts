import { Request, Response } from "express";
import { models } from "@models/index";
import { BaseRepository } from "src/repository/base-repository";

const getEntities = async (req: Request<{tableName: string}>, res: Response) => {
  const tableName = req.params.tableName;
  const model = models[tableName];

  // @ts-ignore:next-line
  const repository = new BaseRepository(model);
  const results = await repository.find();

  return res.json(results)
};

export {
  getEntities,
};
