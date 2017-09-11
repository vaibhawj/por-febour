import express from 'express';
import bodyParser from 'body-parser';
import routes from './api/routes/rsvpRoutes';

const app = express(),
    port = 3001;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

// regsiter the routes
routes(app);



app.listen(port);

console.log('por-febour RESTful API server started on: ' + port);