import { Router } from "express";
import { errorHandler } from "./handleError";
import { getClasses, getClass, createClass } from './controller';

const router = Router();

router.get(
  "/classes/:classes",
  errorHandler.asyncMiddleware(getClasses)
);

router.get(
  "/classes/:classes/:id",
  errorHandler.asyncMiddleware(getClass)
);

router.post(
  "/classes/:classes",
  errorHandler.asyncMiddleware(createClass)
);

export { router };
