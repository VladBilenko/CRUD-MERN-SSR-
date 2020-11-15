import mongoose from 'mongoose';

/**
 * Set up DB models.
 */
import './RefreshToken';
import './User';
import './Notation';

/**
 * Set up DB connection.
 */
const connectWithDB = function () {
  console.log('connect mongo');
    try {
        mongoose.connect('mongodb://mongo/27017', {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useCreateIndex: true
        });
        const db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'));
        db.once('open', function () {
            console.log('DB connection opened');
        });
    } catch (e) {
        throw new Error(e);
    }
};

export default connectWithDB;

