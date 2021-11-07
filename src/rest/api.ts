import { Router, Request } from "express";
import { asyncMiddleware } from "./handleError";
import { getEntities } from './controller';

const router = Router();

// this.router.post(
//   "/",
//   (
//     req: Request<{}, {}, BodyCreateChannel>,
//     res: Response<POPResponse<ChannelModel>>,
//     next: NextFunction
//   ) => this.channelController.create(req, res, next)
// );

router.get(
  "/classes/:tableName",
  asyncMiddleware(getEntities)
);

export { router };