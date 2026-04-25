//External modules
import crypto from "crypto";

const OTPGenerate = (length = 6) => {
  return crypto.randomInt(10 ** (length - 1), 10 ** length).toString();
};

export default OTPGenerate;
