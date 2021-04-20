// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();
// --------------------- Models ------------------

// ------------------- Components ----------------

// -------------------- Services -----------------

// --------------------- Routes ------------------
import * as helloworldRoute from "./helloworld.route";

router.use("/helloworld", helloworldRoute.router);

export {router};
