import mongoose from 'mongoose';
import { CONFIG } from './environmentvariable';

console.log(CONFIG.MONGOURL);

if (CONFIG.MONGOURL) {
    mongoose.connect(CONFIG.MONGOURL)
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully.');
    })
    .catch((error) => {
        console.error('Error connecting to MongoDB Atlas:', error);
    });
} else {
    console.error('MongoDB URL is not defined in the environment variables.');
}

// Optional: Listen for mongoose connection events
mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to database.');
});

mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error: ${err}`);
});

mongoose.connection.on('disconnected', () => {
    console.log('Mongoose disconnected.');
});
