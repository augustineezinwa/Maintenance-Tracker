import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import validator from 'express-validator';
import indexRouter from './router/indexRouter';
import ErrorHandler from '../server/helper/ErrorHandler';

const {
  handleTableReadError, handleTableCreationError,
  handleDatabaseConnectionError, handleTableWriteError
} = ErrorHandler;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(validator());
app.use(morgan('dev'));
const PORT = process.env.PORT || 2020;

app.use('/api/v1', indexRouter);
app.use('/error/read', (err, res) => handleTableReadError(err, res));
app.use('/error/create', (err, res) => handleTableCreationError(err, res));
app.use('/error/connect', (err, res) => handleDatabaseConnectionError(err, res));
app.use('/error/write', (err, res) => handleTableWriteError(err, res));
app.use('/', (req, res) => {
  res.send({
    status: 'success',
    data: {
      message: 'welcome to maintenance-tracker'
    }
  });
});


app.listen(PORT, () => console.log(`server is listening on PORT ${PORT}`));

export default app;
