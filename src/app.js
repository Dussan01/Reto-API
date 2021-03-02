import express from "express";
import morgan from "morgan";
import pkg from "../package.json";

import { createRoles } from "./libs/inialSetup";

import authRoutes from "./routes/auth.routes";
import adminRoutes from "./routes/admin.routes";
import userRoutes from "./routes/user.routes";


//.------------------------------
//No queda mejor de esta forma
// Eninedo de esta forma lo mejore y practicamos el tema git
// De acuerdo el ultimo commit 
// Perfect
const app = express()
createRoles();
global.__basedir = __dirname;

app.set('pkg', pkg);
app.use(express.json());

app.use(morgan('dev'));

app.get('/', (req, res) => {
    res.json({
        nombreproyecto: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version
    })
})



app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/user', userRoutes);



export default app;