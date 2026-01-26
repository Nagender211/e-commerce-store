import mongoose from 'mongoose'

const ProductShema=mongoose.Schema({
    productname: {
        type: String,
        required: true,
        trim: true
    },
    productdiscription: {
        type: String,
        required: true,
        trim: true
    },
    productrating: {
        type: Number,
        min: 1,
        max: 5,
    },
    productprice:{
        type: Number,
        required: true
    },
    productcategory: {
        type: String,
        enum: ["General","Electronics","Fashon","Male dress","Female dress","Sports"]
    },
    images: {
        type: [String],
  default: [],

    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
},{timestamps: true});
export default mongoose.model("Product",ProductShema)