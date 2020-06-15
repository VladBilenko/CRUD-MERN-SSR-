import mongoose from 'mongoose';

const NotationSchema = new mongoose.Schema({
    userId: {type: String, required: true},
    title: {type: String, required: true},
    description: {type: String},
    expiresAt: {type: Date, required: true},
    completed: {type: Boolean, required: true}
}, {timestamps: true});

mongoose.model('Notation', NotationSchema);