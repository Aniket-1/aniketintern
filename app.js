const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(bodyParser.urlencoded({extended: true}));


const User = require('./models/user');
const Transaction = require('./models/transactions');

mongoose
    .connect("mongodb://localhost:27017/esd", { 
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
    .then(() => console.log("Connection Successful"))
    .catch(er = () => console.log("nahi hua connect"))


app.get('/', (req, res) =>{
    res.render('index')
})

app.get('/viewusers', (req, res) =>{
    User.find({} =(err,users) => {
        if(err){
        console.log(err);
      }
      else{
        res.render("viewusers",{users:users});
      }
      });
    
});

mongoose.set('useFindAndModify', false);

app.get("/viewusers/:id", async(req, res) =>{
    const { id } = req.params;
    const user = await User.findById(id);
    const users = await User.find({})
    res.render("transfer", {user, users});
});

app.get("/viewusers/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);
    res.render("transferform", {fromUser, toUser});
});



app.post("/viewusers/:id1/:id2", async(req, res) =>{
    const {id1, id2} = req.params;
    const balance = parseInt(req.body.balance);
    const fromUser = await User.findById(id1);
    const toUser = await User.findById(id2);

    if(balance <= fromUser.balance && balance>0){

        let fromNewBalance = fromUser.balance - balance;
        let toNewBalance = parseInt(toUser.balance + balance);
        await User.findByIdAndUpdate(id1, {balance : fromNewBalance}, { runValidators: true, new: true });
        await User.findByIdAndUpdate(id2, {balance : toNewBalance}, { runValidators: true, new: true });

        let newTransaction = new Transaction();
        newTransaction.from = fromUser.name;
        newTransaction.to = toUser.name;
        newTransaction.transferAmount = balance;
        await newTransaction.save();

        res.redirect("/viewusers");
    }
    else{
        res.render('error');
    }
})


app.get("/transhistory", async(req, res)=>{
    const transactions = await Transaction.find({});
    res.render("transhistory", {transactions});
});



app.listen(5000 || process.env.PORT, process.env.IP, ()=>{
    console.log("SERVER STARTED !");
});