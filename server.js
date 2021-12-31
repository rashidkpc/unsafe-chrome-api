
import express from 'express'
import contentRoute from './routes/content.js';

const app = express()
const port = 3000
app.use(express.json());

const routes = [contentRoute];
routes.forEach(route => route(app));

app.listen(port, () => console.log(`Running on port ${port}`));