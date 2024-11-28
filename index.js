import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import fs from "fs";

const data = JSON.parse(fs.readFileSync("blogData.json")); 
const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.json());

app.get('/', (req, res) => {
    res.render('index.ejs', {content : data});
});

app.post('/post', (req, res) => {
    data.push(req.body);
    fs.writeFileSync("blogData.json", JSON.stringify(data));
    res.redirect('/');
});
app.listen(port, (req,res) => {
    console.log(`listening on port ${port}`);
})