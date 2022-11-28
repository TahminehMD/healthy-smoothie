const express = require("express")
const app = express()
app.use(express.urlencoded())
const env = require("dotenv")
env.config()
require("./config/db.js")
const Smoothie = require("./models/smoothies.js")
const { redirect } = require("express/lib/response")
const res = require("express/lib/response")

app.get("/index", async function (req, res) {
    let all = await Smoothie.find({})
    res.render("index.ejs", { smoothies: all })
})

app.get("/recipe/:id", async function (req, res) {
    let all = await Smoothie.find({})
    res.render("show.ejs", { item: all[req.params.id] , id:req.params.id })
})

app.get("/like/:id", async function (req, res) {
    let all = await Smoothie.find({})
    let item = all[req.params.id]
    item.like++
    await item.save()
    res.redirect("/index")
})

app.get("/add", (req, res) => {
    res.render("add.ejs")
})

app.post("/add", async function (req, res) {
    let newSmoothie = new Smoothie(req.body)
    await newSmoothie.save()
    res.redirect("/index")
})

app.get("/delete/:id" , async function (req, res) {     
     let allSmoothies = await Smoothie.find({})     
     let toDeleteSmoothie = allSmoothies[parseInt(req.params.id)]     
     await  Smoothie.deleteOne(toDeleteSmoothie)
     res.redirect("/index")
} )

app.get("/comment/:id" , (req,res)=>{
    res.render("comment.ejs" , {id: req.params.id})
})

app.post("/comment/:id" , async function(req,res){
    let allSmoothies = await Smoothie.find({})
    let toCommentSmoothie =  allSmoothies[req.params.id]

    let newComment = req.body; 
    newComment.date = Date.now()
    newComment.smoothie = toCommentSmoothie.name
    toCommentSmoothie.comments.push(newComment)

    await toCommentSmoothie.save()

    res.redirect(`/recipe/${req.params.id}`)
})

app.get("/edit/:id", async function(req,res){
    let allSmoothies = await Smoothie.find({})    
    res.render("edit.ejs" , {item : allSmoothies[req.params.id] , id:req.params.id })
})

app.post("/edit/:id", async function(req,res){
    let allSmoothies = await Smoothie.find({})
    let toEditSmoothie = allSmoothies[req.params.id]
    await Smoothie.findOneAndUpdate({ _id: toEditSmoothie._id } , req.body)    

    res.redirect(`/recipe/${req.params.id}`) 
})

app.listen(process.env.port, () => {
    console.log("we are listening.")
})