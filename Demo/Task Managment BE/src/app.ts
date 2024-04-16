import express, { Request, Response, NextFunction, Express } from 'express';
import config from './config';
import bodyParser from 'body-parser';
import routes from './routes';
import './dbConnection'

const app: Express = express();
app.use((req : Request, res : Response, next : NextFunction ) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});

app.use(bodyParser.json());
app.use('/api', routes);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


