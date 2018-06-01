import express from 'express';
import UserMigration from '../migration/UserMigration';
import RequestMigration from '../migration/RequestMigration';
import AdminMigration from '../migration/AdminMigration';

const { migrateAdmin } = AdminMigration;
const { migrateUser } = UserMigration;
const { migrateRequest } = RequestMigration;
const databaseRouter = express.Router();

databaseRouter.get('/database', migrateUser);
databaseRouter.get('/database/2', migrateRequest);
databaseRouter.get('/database/admin', migrateAdmin);

export default databaseRouter;
