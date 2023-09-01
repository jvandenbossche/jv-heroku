import 'dotenv/config';
import cors from 'cors';
import express from 'express';

import models from './models';
import routes from './routes';

const app = express();

// * Application-Level Middleware * //

// Third-Party Middleware

app.use(cors());

// Built-In Middleware

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Custom Middleware

app.use((req, res, next) => {
  req.context = {
    models,
    me: models.users[1],
  };
  next();
});

// * Routes * //

app.use('/session', routes.session);
app.use('/users', routes.user);
app.use('/messages', routes.message);

// * Start * //

//app.listen(process.env.PORT, () =>
//  console.log(`Example app listening on port ${process.env.PORT}!`),
//);

let port = process.env.PORT || 3000            //  Wallarm is not configured, listen on $PORT
if(process.env.WALLARM_API_TOKEN) port = '/tmp/nginx.socket'       // Wallarm is configured
app.listen(port, (err) => {
	if (err) throw err
	console.log(`> App is listening on ${port}`)
})

