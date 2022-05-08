import dotenv from 'dotenv';
import mongoose from 'mongoose';
dotenv.config();

mongoose.Promise = global.Promise;

const db = {};
db.mongoose = mongoose;
db.url = process.env.DB_URL;

export default db;