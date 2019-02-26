const express = require('express');
const bodyParser = require('body-parser');
const https = require('https');
const app = express();
const port = process.env.PORT || 3000;
const crypto = require('crypto');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const ipfsClient = require('ipfs-http-client');
const ipfs = ipfsClient('localhost', '5001', { protocol: 'http' })

const adapter = new FileSync('./store.json');
const db = low(adapter);
db.defaults({ signatures: [] })
    .write();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send("Verifier App");
});

app.get('/files/:id', (req, res) => {
    ipfs.get(req.params.id, function (err, files) {
        res.contentType("application/pdf");
        res.send(files[0].content);
    });
});

app.get('/signatures/:id', (req, res) => {
    const key = crypto.createHash('sha256')
        .update(req.params.id)
        .digest('base64');
    const data = db.get("signatures").find({ key: key }).value();
    console.log(data);
    res.send(data);
});

app.post('/signatures', (req, res) => {
    ipfs.addFromURL(req.body.url, (err, result) => {
        if (err) {
            throw err
        }
        console.log(result);
        const key = crypto.createHash('sha256')
            .update(result[0].hash)
            .digest('base64');
        db.get('signatures')
            .push({ key: key, issuer: 'Turkey', created_at: new Date() })
            .write();
        res.end(result[0].hash);
    });

});

app.listen(port, () => console.log(`Listening on port ${port}`));