import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import errorHandler from 'errorhandler';
import methodOverride from 'method-override';
import bodyParser from 'body-parser';
import routes from './routes';
import cookieParser from 'cookie-parser';
import Redis from 'ioredis';
import config from './config';

const app = express();

// const redis = Redis({
//     port: config.redisPort,
//     host: config.redisHost,
//     password: config.redisPass
// });

// redis.on('error', (error) => {
//     console.error(error.message, error);
//     process.exit(1);
// });
// app.locals.redis = redis;

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cors());
app.use(methodOverride());
app.use(cookieParser());
app.use(morgan('dev', {
    skip(req, res) {
        return req.originalUrl === '/healthz' && res.statusCode === 200;
    }
}));
// app.use(app.router);
app.use('/', routes);
app.use((_, res) => {
    console.log(res.data);
    //return ''
    return res.status(200).send(res.data);
});
app.use(errorHandler());
app.listen(config.port, () => {
    console.log('Express server listening on %d, in %s mode',
        config.port, app.get('env'));
});
export default app;

/**
 * @author Minhtran
 */