import mongoose from "mongoose";

const phoneModel = new mongoose.Schema({
  _id: Number,
  name: String,
  type: String,
  price: Number,
  rating: Number,
  warranty_years: Number,
  available: Boolean,
});

const Phone = mongoose.model("Phone", phoneModel);

export default Phone;
