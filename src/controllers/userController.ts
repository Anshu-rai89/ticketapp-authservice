
import {Response,Request} from 'express';
import {validationResult} from 'express-validator';
import {RequestValidationError} from '../errors/request-validation-error';
import {User} from '../Modals/User';
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

        const existingUser=await User.findOne({email});
        if(existingUser){
            return res.status(400);
        }

        const user=User.build({email,password});
        user.save();
         //console.log('returning user',user);
        return res.status(201).send({msg:"Signun UP sucess",data:user});
}