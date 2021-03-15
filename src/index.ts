import express  from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import routes from './routes';
import {errorHandler} from './middleware/error-handler';
import {NotFoundError} from './errors/404-error';
import mongoose from 'mongoose';
const port =process.env.PORT || 3000;
const app=express();
app.use(json());



// using routes 
app.use('/',routes);
app.use(errorHandler);

const start= async()=>{
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