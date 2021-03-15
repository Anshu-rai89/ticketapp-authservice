import express  from 'express';
import 'express-async-errors';
import {json} from 'body-parser';
import routes from './routes';
import {errorHandler} from './middleware/error-handler';
import {NotFoundError} from './errors/404-error';
const port =process.env.PORT || 3000;
const app=express();
app.use(json());



// using routes 
app.use('/',routes);
app.use(errorHandler);

app.listen(port,()=>{
    console.log(`server is up & running at ${port} !!` );
})