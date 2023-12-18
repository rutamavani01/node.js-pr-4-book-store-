const express = require('express');
const port = 8000;
const app = express();
app.set('view engine','ejs');
app.use(express.urlencoded())

const db = require('./config/db');
const bookstore = require('./models/operation');

app.get('/',(req,res)=>{
    bookstore.find({})
    .then((record)=>{
        return res.render('view',{record});
    }).catch((err)=>{
        console.log(err);
        return false; 
    })
})

app.get('/add',(req,res)=>{
    return res.render('add');
})

app.post('/addRecord',(req,res)=>{
    let name = req.body.name;
    let author_name = req.body.author_name;
    let price = req.body.price;
    let award = req.body.award;
    let pages = req.body.pages;

    bookstore.create({name,author_name,price,award,pages})
    .then((record)=>{
        console.log("data successfully inserted");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/deleteRecord',(req,res)=>{
    let id = req.query.deleteid;
    bookstore.findByIdAndDelete(id)
    .then((rec)=>{
        console.log("Data Deleted");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.get('/editRecord',(req,res)=>{
    let id = req.query.editid;
    bookstore.findById(id)
    .then((single)=>{
        return res.render('edit',{
            single
        })
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.post('/updateRecord',(req,res)=>{
    bookstore.findByIdAndUpdate(req.body.editId,{
        name : req.body.name,
        author_name  :req.body.author_name,
        price : req.body.price,
        award  :req.body.award,
        pages : req.body.pages
    }).then((rec)=>{
        console.log("data update");
        return res.redirect('/');
    }).catch((err)=>{
        console.log(err);
        return false;
    })
})

app.listen(port,(err)=>{
    if(err){
        console.log(err);
        return false
    }
    console.log(`start on port ${port}`);
})