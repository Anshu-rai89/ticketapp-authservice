import { Request, Response, NextFunction } from "express";
import {validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';
export const requestValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log('invalid request',errors.array())
          throw new RequestValidationError(errors.array());
          
    }

    next();
};
