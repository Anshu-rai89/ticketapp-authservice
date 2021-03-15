
import {Response,Request} from 'express';
import {validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';
export const curruntUser=async (req:Request,res:Response)=>{
    res.send("Hello")

}

export const createUser=async(req:Request,res:Response)=>{
    const errors=validationResult(req);
    if(!errors.isEmpty()){
        console.log('invalid request',errors.array())
          throw new RequestValidationError(errors.array());
          
    }
        const body=req.body || {};
        const {email,password}=body;
        return res.status(200).json({msg:"Signun UP sucess"});
}