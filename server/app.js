import express from 'express';
import path from 'path';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import cors from 'cors';
import validator from 'express-validator';
import indexRouter from './router/indexRouter';
import ErrorHandler from '../server/helper/ErrorHandler';

const {
  handleTableReadError, handleTableCreationError,
  handleDatabaseConnectionError, handleTableWriteError
} = ErrorHandler;
const app = express();

const swaggerDocument = YAML.load(`${process.cwd()}/swagger.yaml`);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());

app.use(morgan('dev'));
app.use(cors());
const PORT = process.env.PORT || 2020;
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use('/api/v1', indexRouter);
app.use('/error/read', (err, res) => handleTableReadError(err, res));
app.use('/error/create', (err, res) => handleTableCreationError(err, res));
app.use('/error/connect', (err, res) => handleDatabaseConnectionError(err, res));
app.use('/error/write', (err, res) => handleTableWriteError(err, res));
app.use(express.static(path.join(__dirname, '..', '/client/public')));
app.use('/', (req, res) => {
  res.sendFile(path.join(__dirname, '..', '/client/public/index.html'));
});
app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));

export default app;
