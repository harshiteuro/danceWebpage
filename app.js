const express=require("express");
const path=require("path");
const fs=require("fs");
const app=express();
const port=80;
const bodyparser=require("body-parser"); //no use here
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/contactDance', {useNewUrlParser: true, useUnifiedTopology: true});


//define mongoose schema
var contactSchema = new mongoose.Schema({ 
    name: String ,
    number:String,
    email:String,
    address:String
});
var Contact = mongoose.model('Contact',contactSchema);

app.use('/static',express.static('static'))
app.use(express.urlencoded());

app.set('view engine','pug')
app.set('views',path.join(__dirname,'views'))

app.get('/',(req,res)=>{
    const params={};
    res.status(200).render('home.pug',params);
})
app.get('/contact',(req,res)=>{
    const params={};
    res.status(200).render('contact.pug',params);
})

//post request for forms
app.post('/contact',(req,res)=>{
    var myData=new Contact(req.body);
    myData.save().then(()=>{   //.save is used to save the data in mongo db
        res.send("This item has been saved to the database")
    }).catch(()=>{
        res.status(400).send("Item was not saved to the database")
    });
    //res.status(200).render('contact.pug');
})

app.listen(port,()=>{
    console.log(`The application started successfully on port ${port}`);
})