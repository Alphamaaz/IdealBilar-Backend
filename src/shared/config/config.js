// Configuration file for environment-based settings

export const config = {
  // Socket.io CORS origin - adjust based on environment
  socketIOCorsOrigin: process.env.SOCKET_IO_CORS_ORIGIN || "http://localhost:5173",
  
  // Server port
  serverPort: process.env.PORT || 3000,
  
  // Add more configurations as needed
};
