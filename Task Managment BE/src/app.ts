import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import config from './config';
import taskRoutes from './routes/taskRoutes';

require('nodemon');
import db from './db';  // Import the 'db' instance


const app = express();

app.use(bodyParser.json());
app.use('/api', taskRoutes);

const PORT = config.port;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

mongoose.connection.on('connected', () => {
    console.log('Connected to MongoDB');
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});