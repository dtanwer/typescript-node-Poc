import express from 'express';
import http from 'http';
import bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import mongoose from 'mongoose';
import routers from './routers';

const app= express();
app.use(
    cors({
        credentials: true,
    })
);

app.use(compression());
app.use(bodyParser.json());
app.use(cookieParser());


const server = http.createServer(app);


server.listen(8080, () => {
    console.log('server started on http://localhost:8080/');
});

const MONGO_URL="mongodb+srv://dtanwer:deepak123@cluster0.trbmedp.mongodb.net/poc_ts?retryWrites=true&w=majority"

mongoose.Promise=Promise;
mongoose.connect(MONGO_URL);

mongoose.connection.on('connected',()=>{
    console.log('connected to mongo instance');
});
mongoose.connection.on('error',(err)=>{
    console.log('error connecting to mongo',err);
});

app.use('/',routers());




