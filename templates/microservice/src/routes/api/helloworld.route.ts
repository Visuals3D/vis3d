// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from '../../../models/error/error-type.model';
import { paths, components, operations } from '../../../models/generated/api/api.schema';

// ------------------- Components ----------------
import { ErrorComponent } from '../../components/error/error.component';

// -------------------- Services -----------------
import { HelloWorldService } from "../../services/hello-world/hello-world.service";

// --------------------- Types -------------------
type HelloWorldResponses = paths['/helloworld']['get']['responses'];
type HelloWorldResponse200 = HelloWorldResponses['200']['content']['string'];
type HelloWorldResponse500 = HelloWorldResponses['500']['content']['string'];

// -------------------- Globals ------------------
const helloWorldService: HelloWorldService = HelloWorldService.Instance;

router.get("/", (req: any, res: any, next: any) => {
    res.status(200);
    res.send(helloWorldService.getHelloWorld());
});

export { router };
