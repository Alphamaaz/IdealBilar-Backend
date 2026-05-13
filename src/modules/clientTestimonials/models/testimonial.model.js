//External modules
import mongoose from "mongoose";

//Internal modules

const testimonialSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true
    },
    date:{
        type: Date,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
},{
    timestamps: true
});

//export
export default mongoose.model("Testimonial", testimonialSchema)