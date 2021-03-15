import express  from 'express';
import {json} from 'body-parser';
const port =process.env.PORT || 3000;
const app=express();
app.use(json());

app.listen(port,()=>{
    console.log(`server is up & running at ${port}` );
})