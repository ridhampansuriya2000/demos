import mongoose, { ConnectOptions } from 'mongoose';
import config from './config';
import { MongoClientOptions } from 'mongodb';

interface DbConnection {
    on: (event: string, callback: () => void) => void;
    once: (event: string, callback: () => void) => void;
}

mongoose.Promise = global.Promise;

// const db : DbConnection = mongoose.connect(config.mongoURI).then((res)=>{
//     console.log(`Database is connected with :->  ${config.mongoURI}`)
// }).catch((error)=>{
//     console.log("error in database connection : ",error)
// });

// const dbOptions: MongoClientOptions & ConnectOptions = {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
// };

mongoose.connect(config.mongoURI, /*dbOptions*/).then((res)=>{
    console.log(`Database is connected with :->  ${config.mongoURI}`)
}).catch((error : any)=>{
    console.log("error in database connection : ",error)
});

const db: DbConnection = mongoose.connection;
//
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

export default db;
