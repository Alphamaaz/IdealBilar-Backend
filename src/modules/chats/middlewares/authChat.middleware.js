//External modules


//Internal modules
import jwtVerify from "../../../shared/utils/jwtVerify.js";
const authenticateSocket = (socket, next) =>{
    const token = socket?.handshake?.auth?.token;
    if(!token){
        return next(new Error("Unauthorized"));
    }
    try {
        const user = jwtVerify(token);
        socket.user = user;
        next();
    } catch (error) {
       next(new Error("Invalid Token"))
    }
}

//export
export {
    authenticateSocket
}