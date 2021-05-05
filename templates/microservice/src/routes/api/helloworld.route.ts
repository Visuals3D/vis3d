// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from '../../../models/error/error-type.model';
import { paths, components, operations } from '../../../models/generated/api/api.schema';

// --------------------- Errors ------------------
import  { InvalideWorldError } from '../../services/hello-world/hello-world.errors';

// ------------------- Components ----------------
import { ErrorComponent } from '../../components/error/error.component';

// -------------------- Services -----------------
import { HelloWorldService } from "../../services/hello-world/hello-world.service";

// --------------------- Types -------------------
type HelloWorldResponses = paths['/helloworld']['get']['responses'];
type HelloWorldResponse200 = HelloWorldResponses['200']['content']['string'];
type HelloWorldResponse400 = HelloWorldResponses['400']['content']['string'];

// -------------------- Globals ------------------
const helloWorldService: HelloWorldService = HelloWorldService.Instance;

router.get("/", (req: any, res: any, next: any) => {
    try {
        const result:HelloWorldResponse200 = helloWorldService.getHelloWorld();
        res.status(200);
        res.send(result);
    } catch (err) {
        if (err instanceof InvalideWorldError) {
            const error:HelloWorldResponse400 = new ErrorComponent('This world is so crazy its invalid', ErrorType.invalid);
            res.status(error.status);
            res.send(error);
        }
    }
});

export { router };
