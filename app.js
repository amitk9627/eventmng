const express= require('express');
const app= express();
const eventRouter=require('./routes/event.js');
const userRoutes=require('./routes/user.js');

//middleware
const authMiddleware=require('./middleware/auth.js');

app.use(express.json());

app.use("/event",authMiddleware,eventRouter);
app.use("/user",userRoutes);



module.exports=app;