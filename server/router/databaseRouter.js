import express from 'express';
import UserMigration from '../migration/UserMigration';

const { migrateUser } = UserMigration;
const databaseRouter = express.Router();

databaseRouter.get('/database', migrateUser);

export default databaseRouter;
