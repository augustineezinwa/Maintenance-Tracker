import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';
import indexRouter from './router/indexRouter';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
const PORT = process.env.PORT || 2020;
app.use('/api/v1', indexRouter);
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
