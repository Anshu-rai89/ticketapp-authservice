import express  from 'express';
import cookieSession from 'cookie-session';
import 'express-async-errors';
import {json} from 'body-parser';
import routes from './routes';
import {errorHandler} from './middleware/error-handler';
import mongoose from 'mongoose';
const port =process.env.PORT || 3000;
const app=express();

app.set('trust proxy',true);
app.use(json());
app.use(cookieSession({
    signed:false,
    secure:true
}));
// using routes 
app.use('/',routes);
app.use(errorHandler);

const start= async()=>{

    if(!process.env.JWT_KEY){
        throw new Error("JWT KEY Env Not Found");
        
    }
    try{
        await mongoose.connect("mongodb://auth-mongo-svc:27017/auth",{
            useNewUrlParser:true,
            useUnifiedTopology:true,
            useCreateIndex:true
        });

        console.log("Coonected to AUTH DB");
    }catch(err){
        console.log(err);
    }
    app.listen(port,()=>{
        console.log(`server is up & running at ${port} !!` );
    })
}

start();