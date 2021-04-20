// -------------------- Packages -----------------
import * as express from "express";
const router = express.Router();

// --------------------- Models ------------------
import { ErrorType } from '../../../models/error/error-type.model';

// ------------------- Components ----------------
import { ErrorComponent } from '../../components/error/error.component';

// -------------------- Services -----------------

import { AuthService } from "../../services/auth/auth.service";
const googleDriveService: AuthService = AuthService.Instance;


router.get("/", (req: any, res: any, next: any) => {
    res.status(200);
    res.send('Hello World');
});

export { router };
