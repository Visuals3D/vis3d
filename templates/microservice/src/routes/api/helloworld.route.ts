// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from '../../../models/error/error-type.model';

// ------------------- Components ----------------
import { ErrorComponent } from '../../components/error/error.component';

// -------------------- Services -----------------
import { HelloWorldService } from "../../services/hello-world/hello-world.service";

const helloWorldService: HelloWorldService = HelloWorldService.Instance;


router.get("/", (req: any, res: any, next: any) => {
    res.status(200);
    res.send(helloWorldService.getHelloWorld());
});

export { router };
