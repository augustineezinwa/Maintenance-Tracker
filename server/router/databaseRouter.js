import express from 'express';
import UserMigration from '../migration/UserMigration';
import RequestMigration from '../migration/RequestMigration';
import AdminMigration from '../migration/AdminMigration';
import Authentication from '../middlewares/Authentication';

const { migrateAdmin } = AdminMigration;
const { migrateUser } = UserMigration;
const { migrateRequest } = RequestMigration;
const { secureGate } = Authentication;
const databaseRouter = express.Router();

databaseRouter.put('/database', secureGate, migrateUser);
databaseRouter.put('/database/2', secureGate, migrateRequest);
databaseRouter.put('/database/admin', secureGate, migrateAdmin);

export default databaseRouter;
