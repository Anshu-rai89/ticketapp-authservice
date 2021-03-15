import express  from 'express';
import {json} from 'body-parser';
import routes from './routes';
const port =process.env.PORT || 3000;
const app=express();
app.use(json());

// using routes 
app.use('/',routes);
app.listen(port,()=>{
    console.log(`server is up & running at ${port} !!` );
})