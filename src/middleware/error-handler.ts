import { Request, Response, NextFunction } from "express";
import {CustomError} from '../errors/custom-error';
export const errorHandler =  (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
      
    console.log('calling middleware');
    if(err instanceof CustomError){
        return res.status(err.statusCode).json({errors:err.serializeErrors()});
    }

    return res.status(400).send([{errors:"something went wrong "}]);
    
};
