const express = require('express');
const app = express();
const bodyParser = require ('body-parser');
const { json } = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const productsRouter = require('./routers/products');
const categorysRoutes = require('./routers/categories');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');
const authJwt = require('./helpers/jwt');




app.use(cors());
app.options('*', cors())

//middleware

app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());

 


//Routers



app.use('/categories', categorysRoutes);
app.use(`/products`, productsRouter);
app.use('/users', usersRoutes);
app.use(`/orders`, ordersRoutes); 

  









mongoose.connect('mongodb+srv://amal:amal@cluster0.hn8rfux.mongodb.net/?retryWrites=true&w=majority')
.then(()=>{
    console.log('Database connect is ready ...')
})
.catch((err)=>{
    console.log('error');
})
                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            
app.listen(3000, ()=>{ 

    console.log('server is running http://localhost:3000');
})
 