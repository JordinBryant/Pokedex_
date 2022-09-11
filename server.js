const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require("method-override");
const pokemon = require("./models/pokemon.js")

app.use(express.static("public"));

app.use(express.urlencoded({ extended: false }));

app.use(methodOverride("_method"));



app.get("/pokemon", (req, res)=>{
    res.render("index_views.ejs", {
        pokemon : pokemon,
    });
});

app.get("/pokemon/new", (req, res)=>{
    res.render("new.ejs",{
        pokemon: pokemon,
    })
});     

app.get("/pokemon/:id" , (req, res)=>{
    res.render("show_views.ejs" , {
        pokemon: pokemon[req.params.id],
})
});

app.post("/pokemon" , (req, res)=>{
    let type = req.body.type;
let typeArr = type.split(" , ");
let stats ={
    hp: req.body.hp,
    attack: req.body.attack,
    defense: req.body.defense,
};

let newPoke ={
    name: req.body.name,
    img: req.body.img,
    type: typeArr,
    stats: stats
};
    pokemon.push(newPoke);
    res.redirect("/pokemon");
});

app.get("/pokemon/:id/edit", (req, res)=>{
    res.render("edit.ejs",{
        pokemon: pokemon[req.params.id],
        x: req.params.id,
    })
});     

app.put("/pokemon/:id", (req, res)=>{
    let type = req.body.type;
    let typeArr = type.split(" , ");
    let stats ={
        hp: req.body.hp,
        attack: req.body.attack,
        defense: req.body.defense,
    };
    
    pokemon[req.params.id] = req.body;
let newPoke ={
    name: req.body.name,
    img: req.body.img,
    type: typeArr,
    stats: stats
};
    // pokemon.push(newPoke);
    console.log(newPoke);
    res.redirect("/pokemon");
});


app.delete("/pokemon/:id/", (req,res)=>{
    pokemon.splice(req.params.id , 1)
    res.redirect("/pokemon")
})


















app.listen(3000);