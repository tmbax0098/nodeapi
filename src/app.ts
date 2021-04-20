import express from 'express';
import {http} from "./config"
import {json, urlencoded} from "body-parser";
import mongoose from "mongoose";
const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/nodeapi', {useNewUrlParser: true, useUnifiedTopology: true});


import routerV1 from "./v1/routes/index";

const app = express();
app.use(cookieParser())

app.use(urlencoded());
app.use(json());

// app.use((req: any, res: any, next: any) => {
//     // console.log("req : \n" , req);
//     console.log("req.url : ", req.url);
//     console.log("req.headers : ", req.headers);
//     console.log("req.params : ", req.params);
//     console.log("req.query : ", req.query);
//     console.log("req.body : ", req.body);
//     next();
// })

app.use(routerV1);

app.listen(http.port, () => {
    console.log(`Server listen on port ${http.port}`)
})