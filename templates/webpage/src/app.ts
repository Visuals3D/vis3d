import dotenv from "dotenv";
import initExpress from "./config/express";

// Load Env File
dotenv.config();

// Start Server
const server = initExpress();

/*
server.close(() => {
  console.log("Express server closed."); // tslint:disable-line
});
*/
