
import {Response,Request} from 'express';
import jwt from 'jsonwebtoken';
import {User} from '../Modals/User';
import {BadRequestError} from '../errors/badRequestError';
import {PasswordManager} from '../services/passwordManager';
export const curruntUser=async (req:Request,res:Response)=>{
    res.send("Hello")

}

export const createUser=async(req:Request,res:Response)=>{
        const body=req.body || {};
        const {email,password}=body;

        const existingUser=await User.findOne({email});
        if(existingUser){
            throw new BadRequestError();
        }

        const user=User.build({email,password});
        await user.save();

        // generate JWT 
        const userJwt=jwt.sign({
            id:user._id,
            email:user.email
        },process.env.JWT_KEY!);


        req.session={
            jwt:userJwt
        };

        // store it in session 
         //console.log('returning user',user);
        return res.status(201).send({user});
}


export const createSession=async(req:Request,res:Response)=>{

    const body=req.body || {};
    const {email,password}=body;

        const existingUser=await User.findOne({email});

        console.log('existing user',existingUser);
        if(!existingUser  || (!PasswordManager.compare(existingUser.password,password))){
            throw new BadRequestError();
        }


        const userJwt=jwt.sign({
            id:existingUser._id,
            email:existingUser.email
        },process.env.JWT_KEY!);


        req.session={
            jwt:userJwt
        };

        // store it in session 
         //console.log('returning user',user);
        return res.status(200).send(existingUser);

}

