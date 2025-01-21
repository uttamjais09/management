const express = require('express')
const bodyParser = require('body-parser')
const path = require('path');
const fs = require('fs')
const users=[{
    userName:"Aditya Gupta",
    userEmail:"aditya@gmail.com",
    userAge:"22",
    userUniqueId:'1'
},{
    userName:"uttam jaiswal",
    userEmail:"uttam@gmail.com",
    userAge:"23",
    userUniqueId:'2'
},{
    userName:"noob",
    userEmail:"noob@gmail.com",
    userAge:"24",
    userUniqueId:'3'

}
]
const app = express()
app.set("view engine","ejs");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true})) ;
app.use(express.static(path.join(__dirname,"public"))) ;

function saveUserToFile() { 
    fs.writeFile('users1.json', JSON.stringify(users, null, 2), (err) => { 
        if (err) { 
            console.error('Error writing file:', err); 

        } 
        else { 
            console.log('User data saved to users.json'); 

        } 
    });
 }
 

app.get("/",function(req,res){
    res.render("index.ejs",{
        data:users 
    })
})
app.post("/",(req,res)=>{
    const inputUserName = req.body.userName
    const inputUserEmail = req.body.userEmail
    const inputUserAge = req.body.userAge
    const inputUserUniqueId = req.body.userUniqueId

    users.push({
        userName: inputUserName,
        userEmail: inputUserEmail,
        userAge: inputUserAge,
        userUniqueId: inputUserUniqueId
    })
    saveUserToFile();
    res.redirect('/');


    res.render("index", {
        data: users
    })
})

app.post('/delete', (req, res) => {
    var requestedUserUniqueId = req.body.userUniqueId;
    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userUniqueId === requestedUserUniqueId) {
            users.splice((j - 1), 1)
            saveUserToFile();
            res.redirect('/');

        }
    })
    res.render("index", {
        data: users
    })
})

app.post('/update', (req, res) => {
    const inputUserName = req.body.userName
    const inputUserEmail = req.body.userEmail
    const inputUserAge = req.body.userAge
    const inputUserUniqueId = req.body.userUniqueId

    var j = 0;
    users.forEach(user => {
        j = j + 1;
        if (user.userUniqueId === inputUserUniqueId) {
            user.userName = inputUserName
            user.userEmail = inputUserEmail
            user.userAge = inputUserAge
            saveUserToFile();
            res.redirect('/');

        }
    })
    res.render("index", {
        data: users
    })
})

app.listen(3000, (req, res) => {
    console.log("App is running on port 3000")
})