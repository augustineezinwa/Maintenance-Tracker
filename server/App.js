import express from 'express';
import bodyParser from 'body-parser';
import morgan from 'morgan';

const app = express();
app.use(bodyParser.json());
app.use(morgan('dev'));
const PORT = process.env.PORT || 2020;
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
