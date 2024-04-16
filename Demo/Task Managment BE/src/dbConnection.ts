import mongoose, { Connection } from 'mongoose';
import config from './config';

mongoose.connect(config.mongoURI);

const db: Connection = mongoose.connection;

db.on('error', (err: Error) => {
  console.error('MongoDB connection error:', err);
});

db.once('open', () => {
  console.log('Connected to MongoDB');
});

export default db;
