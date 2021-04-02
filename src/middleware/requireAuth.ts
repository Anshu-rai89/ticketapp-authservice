import { Request, Response, NextFunction } from "express";
import {UnAuthorizedError} from '../errors/unauthorized-error';
export const requestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    
    if(!req.currentUser ){
       throw new UnAuthorizedError();
    }

    next();
};
