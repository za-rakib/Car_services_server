const express = require('express')

const MongoClient = require('mongodb').MongoClient;
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express()
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.send('Hello car server !')
})

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zqlov.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const Collection = client.db("car-services").collection("services");

    app.post('/formData', (req, res) => {
        const data = req.body;
        console.log(data);
        Collection.insertOne(data)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result);
            })
    })

    app.post('/reviewForm', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })
    app.get('/review', (req, res) => {
        collection.find({})
            .toArray((error, documents) => {
                res.send(documents);
            })
    })
    app.post('/addService', (req, res) => {
        const file = req.files.file;
        const title = req.body.title;
        const description = req.body.description;
        const filePath = `${__dirname}/service/${file.name}`

        file.mv(filePath, error => {
            if (error) {
                console.log(error);
                return res.status(500).send({ msg: 'Failed to upload' })
            }
            const newImg = fs.readFileSync(filePath);
            const encImg = newImg.toString('base64');

            const image = {
                contentType: req.files.file.mimeType,
                size: req.files.file.size,
                img: Buffer(encImg, 'base64')
            }

            collection.insertOne({ title, description, image })
                .then(result => {
                    fs.remove(filePath, err => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send({ msg: 'Failed to upload' })
                        }
                        res.send(result.insertedCount > 0);
                    })

                })
        })
    })
    app.post('/booking', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })

    app.post('/loginAdmin', (req, res) => {
        const reviewData = req.body;
        collection.insertOne(reviewData)
            .then(result => {
                res.send(result.insertedCount > 0)
                console.log(result)
            })
    })
  
});

app.listen(process.env.PORT || port)