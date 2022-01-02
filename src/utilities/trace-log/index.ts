import { Model, ModelCtor } from "sequelize";
import { models } from "@models/index";


export class TraceLogRestApi {
  private traceLog: ModelCtor<Model<any, any>>
  constructor() {
    this.traceLog = models.getModel('TraceLog');
  }
}