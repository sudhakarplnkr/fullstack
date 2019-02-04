import * as express from 'express';
import { Application, NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';
import { AccountController } from '../controllers/accountController';
import { ContactController } from '../controllers/registrationController';

export class Routes {

    private readonly contactController: ContactController = null;
    private readonly accountController: AccountController = null;

    public constructor() {
        this.contactController = new ContactController();
        this.accountController = new AccountController();
    }

    private allowCors(req, res, next) {
        res.header("Access-Control-Allow-Origin", "*");
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
        next();
    }

    public routes(application: Application): void {
        const protectedRoutes = express.Router();

        application.use(this.allowCors);
        protectedRoutes.use(this.allowCors);

        application.use('/api', application._router);

        protectedRoutes.use((req: Request, res: Response, next: NextFunction) => {
            const token = req.headers['access-token'].toString();
            if (!token) {
                res.send({
                    message: 'No token provided.'
                });
                return;
            }
            jwt.verify(token, application.get('Secret'), (err: any) => {
                if (err) {
                    return res.json({ message: 'invalid token' });
                }
                next();
            });
        });

        application.route('/')
            .get((req: Request, res: Response) => {
                res.status(200).send({
                    message: 'GET request successfulll!!!!'
                });
            });

        // authentication
        application.route('/authenticate')
            .post(this.accountController.login);

        // Contact 
        protectedRoutes.route('/contact')
            .get((req: Request, res: Response, next: NextFunction) => {
                // middleware
                console.log(`Request from: ${req.originalUrl}`);
                console.log(`Request type: ${req.method}`);
                next();
            }, this.contactController.getContacts)

            // POST endpoint
            .post(this.contactController.addNewContact);

        // Contact detail
        protectedRoutes.route('/contact/:contactId')
            // get specific contact
            .get(this.contactController.getContactWithID)
            .put(this.contactController.updateContact)
            .delete(this.contactController.deleteContact);
    }
}