//External modules
import mongoose from "mongoose";
import { optional } from "zod";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phoneNumber: {
    type: Number,
    optional: true,
    default: null
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    // select: false
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user"
  },
  isVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: {
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    transform: (_doc, ret) => {
      delete ret.password;
      return ret;
    }
  },
  toObject: {
    
  }
});

export default mongoose.model("User", userSchema);
