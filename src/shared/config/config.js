// Configuration file for environment-based settings

const defaultCorsOrigins = [
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:3000",
  "http://localhost:3001",
  "https://ideal-bilar-site.vercel.app",
  "https://idealbilar-dashboard.vercel.app"
];

const parseOrigins = (value) =>
  value
    ? value
        .split(",")
        .map((origin) => origin.trim())
        .filter(Boolean)
    : [];

const socketCorsOrigins = [
  ...defaultCorsOrigins,
  ...parseOrigins(process.env.ALLOWED_ORIGINS),
  ...parseOrigins(process.env.SOCKET_IO_CORS_ORIGIN),
];

export const config = {
  // Socket.io CORS origins - array of allowed origins
  socketIOCorsOrigin: [...new Set(socketCorsOrigins)],
  
  // Server port
  serverPort: process.env.PORT || 3000,
  
  // Add more configurations as needed
};
