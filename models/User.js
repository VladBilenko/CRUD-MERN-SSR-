import mongoose from 'mongoose';
import crypto from 'crypto';
import * as jwt from 'jsonwebtoken';
import {jwtConf, cryptoConf} from '../server-config';
import {userRoles} from '../constants';

const UserSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    notationsList: {type: [String]},
    role: { type: String, enum: [userRoles.User], required: true },
    salt: {type: String},
    hash: {type: String}
}, {timestamps: true});

UserSchema.methods.setPassword = function(passwordString) {
    this.salt = crypto.randomBytes(cryptoConf.randomBytesSize).toString(cryptoConf.encodingType);
    this.hash = this.hashPassword(passwordString);
};

UserSchema.methods.addNotation = function(notationId) {
    this.notationsList.push(notationId);

    return this;
};

UserSchema.methods.validatePassword = function(passwordString) {
    const passwordHash = this.hashPassword(passwordString);

    return passwordHash === this.hash;
};

UserSchema.methods.hashPassword = function(passwordString) {
    return crypto
        .pbkdf2Sync(passwordString, this.salt, cryptoConf.iterations, cryptoConf.keylen, cryptoConf.digest)
        .toString(cryptoConf.encodingType);
};

UserSchema.methods.toPublicVersion = function() {
    return {
        username: this.username
    }
};

UserSchema.methods.generateJWT = function(expTime) {
    const expDate = new Date();
    expDate.setTime(expDate.getTime() + expTime);

    return jwt.sign({
            id: this._id,
            username: this.username,
            exp: Math.floor(expDate.getTime() / 1000)
        }, jwtConf.secret);
};

mongoose.model('User', UserSchema);