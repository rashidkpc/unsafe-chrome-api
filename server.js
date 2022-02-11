
import express from 'express'
import contentRoute from './routes/content.js';

const app = express()
const port = 3000
const host = '0.0.0.0'
app.use(express.json());

const routes = [contentRoute];
routes.forEach(route => route(app));

app.listen(port, host, () => console.log(`Running on port ${port}`));