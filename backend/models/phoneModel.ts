import mongoose from "mongoose";

const phoneSchema = new mongoose.Schema({
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warranty_years: Number,
  available: Boolean,
});

const Phone = mongoose.model("Phone", phoneSchema);

export default Phone;
