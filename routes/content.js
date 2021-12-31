import {request} from '../lib/request.js'
export default (app) => {
    return app.post('/content', async (req, res) => {
        const {uri, js, script, selector} = req.body;
        if (!uri) return res.status(400).send("uri is required");  
        try {
            res.json(await request(uri, js, script, selector))
        } catch (error) {
            res.status(500).send(error)
        }  
    })
}