import { Router, Request } from "express";
import { errorHandler } from "./handleError";
import { getEntities } from './controller';

const router = Router();


router.get(
  "/classes/:classes",
  errorHandler.asyncMiddleware(getEntities)
);

export { router };
