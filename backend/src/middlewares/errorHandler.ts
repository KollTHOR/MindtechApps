import { Request, Response, NextFunction } from "express";
import { ApiErrorModel } from "../models/apiErrorModel";

export default function errorHandler(
  err: ApiErrorModel,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const isDevEnv: boolean = req.app.get("env") === "development";

  res.status(err.status || 500);
  // res.json({
  //   message:
  //     req.app.get('env') === 'development'
  //       ? err.message
  //       : 'Unknown error happened',
  // });
  const resp = {
    status: err.status || 500,
    message: err.message,
    url: req.originalUrl,
    reqMethod: req.method,
    ip: req.ip,
  };

  res.json(resp);
}
