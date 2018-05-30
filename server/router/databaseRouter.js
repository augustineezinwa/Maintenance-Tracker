import express from 'express';
import UserMigration from '../migration/UserMigration';
import RequestMigration from '../migration/RequestMigration';

const { migrateUser } = UserMigration;
const { migrateRequest } = RequestMigration;
const databaseRouter = express.Router();

databaseRouter.get('/database', migrateUser);
databaseRouter.get('/database/2', migrateRequest);

export default databaseRouter;
