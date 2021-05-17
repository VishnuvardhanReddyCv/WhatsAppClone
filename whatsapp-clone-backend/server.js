import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import MessageSchema from './src/Schemas/MessageSchema.js';
import Pusher from 'pusher';

const app = express();
const PORT = process.env.PORT || 9000;

app.use(cors());
app.use(bodyParser.json());

const pusher = new Pusher({
    appId: "1115955",
    key: "fe8301f3e14dcdca3d28",
    secret: "507fb2d83857b34babe8",
    cluster: "ap2",
    useTLS: true
  });
  
  pusher.trigger("my-channel", "my-event", {
    message: "hello world"
  });

//DB Connect
const db_url = 'mongodb+srv://root_user:root_password@whatsappclone.mwnnk.mongodb.net/<dbname>?retryWrites=true&w=majority';
mongoose.connect(db_url, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.get('/', (req,res) => res.status(200).send("Running...."));

app.post('/api/messages/new',(req,res) => {
    const message = req.body;
    MessageSchema.create(message,(err,data) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send(data);
        }
    })
});

app.get('/api/messages/sync',(req,res) => {
    MessageSchema.find((err,data) => {
        if(err) {
            res.status(500).send(err);
        }else {
            res.status(200).send(data);
        }
    })
});


app.listen(PORT, function() {
    console.log("Server is running on Port: " + PORT);
});

jest.mock('', () => ({
    useMethod: jest.fn( () => ({ctaTargetBlank : true})),
}));