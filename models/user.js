const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
      balance: {
        type: Number,
        min: 0,
        required: true
      }
})

User = new mongoose.model('User', userSchema)

const user1 = new User({
    name:'Aniket Singh',
    email:'aniket@gmail.com',
    balance:10000
})
//user1.save();


const user2 = new User({
    name:'Vishal Singhania',
    email:'vishal@gmail.com',
    balance:9000
})
//user2.save();

const user3 = new User({
    name:'Darsh Shetty',
    email:'darsh@gmail.com',
    balance:2000
})
//user3.save();

const user4 = new User({
    name:'Sudhanshu Rai',
    email:'sudhanshu@gmail.com',
    balance:0
})

//user4.save();

const user5 = new User({
  name:'Pratyaksha Ambast',
  email:'prats@gmail.com',
  balance:2500
})
//user5.save();

const user6 = new User({
  name:'Nidhi Shetty',
  email:'nidz@gmail.com',
  balance:7500
})
//user6.save();

const user7 = new User({
  name:'Janhavi Shetty',
  email:'janhavi@gmail.com',
  balance:5500
})
//user7.save();

const user8 = new User({
  name:'Smruti Singh',
  email:'smruti@gmail.com',
  balance:4500
})
//user8.save();

const user9 = new User({
  name:'Umer Qureshi',
  email:'umer@gmail.com',
  balance:3500
})
//user9.save();



module.exports = User

