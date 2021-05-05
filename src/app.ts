import express from 'express';
import {http} from "./config"
import {json, urlencoded} from "body-parser";
import mongoose from "mongoose";

const cookieParser = require('cookie-parser')

mongoose.connect('mongodb://localhost/nodeapi', {useNewUrlParser: true, useUnifiedTopology: true});


// const menu = [
//     {
//         id: "home",
//         text: "Home",
//         role: EnumRoles.all,
//         path: "/auth/login",
//         userState: EnumUserState.all
//     },
//     {
//         id: "signin",
//         text: "Sign in",
//         role: EnumRoles.guest,
//         path: "/auth/signin",
//         userState: EnumUserState.guest
//     },
//     {
//         id: "signup",
//         text: "Sign up",
//         role: EnumRoles.guest,
//         path: "/auth/signup",
//         userState: EnumUserState.guest
//     },
//     {
//         id: "profile",
//         text: "Profile",
//         role: EnumRoles.user,
//         path: "/panel/profile",
//         userState: EnumUserState.user
//     },
//     {
//         id: "user_management",
//         text: "User management",
//         role: EnumRoles.admin,
//         path: "/panel/users",
//         userState: EnumUserState.user
//     },
//     {
//         id: "user_management",
//         text: "User management",
//         role: EnumRoles.user,
//         path: "/panel/users",
//         userState: EnumUserState.user
//     },
//
// ]


import routerV1 from "./v1/routes/index";
// import EnumRoles from "./v1/tools/enums/EnumRoles";
// import EnumUserState from "./v1/tools/enums/EnumUserState";

const app = express();
app.use(cookieParser())

app.use(urlencoded());
app.use(json());

app.use((req: any, res: any, next: any) => {
    // console.log("req : \n" , req);
    console.log("req.url : ", req.url);
    console.log("req.headers : ", req.headers);
    console.log("req.params : ", req.params);
    console.log("req.query : ", req.query);
    console.log("req.body : ", req.body);
    next();
})

console.log('run shod')

app.use("/v1",routerV1);

app.listen(http.port, () => {
    console.log(`Server listen on port ${http.port}`)
})
