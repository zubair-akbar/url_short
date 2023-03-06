import mongoose from 'mongoose';
import db from '../../database/index.js';

const urlSchema = new mongoose.Schema({
  originalURL: String,
  shortUrl: String,
  timesUsed: Number
});

export default mongoose.model("Url", urlSchema);