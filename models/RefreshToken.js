import mongoose from 'mongoose';

const RefreshTokenSchema = new mongoose.Schema({
    username: {type: String, unique: true, required: true},
    value: {type: String, unique: true, required: true}
}, {timestamps: true});

mongoose.model('RefreshToken', RefreshTokenSchema);