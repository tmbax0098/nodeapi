import express from 'express';
import {http} from "./config"
import { json , urlencoded} from "body-parser";
import mongoose from "mongoose";

mongoose.connect('mongodb://localhost/nodeapi', {useNewUrlParser: true, useUnifiedTopology: true});


import routerV1 from "./v1/routes/index";

const app = express();

app.use(urlencoded());
app.use(json());

app.use(routerV1);

app.listen(http.port ,()=>{
    console.log(`Server listen on port ${http.port}`)
})