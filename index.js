const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");

app.use(cors())
app.use(bodyParser. urlencoded({extended:false}));
app.use(bodyParser.json());



var DB ={

    games:[

        {
            id:23,
            title:"call of duty MW",
            year: 2019,
            price:60
        },
        {
            id:65,
            title:"sea of thieves",
            year: 2018,
            price:40
        },
        {
            id:2,
            title:"Micescraft",
            year: 2012,
            price:20
        }
    ]
    
}


app.get("/games",(req,res)=>{
    res.statusCode = 200;
    res.json(DB.games);
});


app.get("/game/:id",(req,res)=>{

    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.sendStatus(400)
        //res.send("isso não é um número");
        } else {

            var id = parseInt(req.params.id);

          var game =  DB.games.find(ga => ga.id == id)

            if (game != undefined) {
                res.statusCode = 200;
                res.json(game); 
            }else{
                res.sendStatus(404);
            }

            
    }


});

app.post("/game",(req,res)=>{
     var {title, price, year} = req.body;

     DB.games.push({
        id:12,
        title,
        price,
        year
     })

     res.sendStatus(200);
});


app.delete("/game/:id",(req,res)=>{

    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.sendStatus(400)
        //res.send("isso não é um número");
        } else {

            var id = parseInt(req.params.id);

          var index =  DB.games.findIndex(g => g.id == id);
          if (index == -1) {
            res.sendStatus(404);
          }else{
            DB.games.splice(index,1);
            res.sendStatus(200);
          }
    }
});


app.put("/game/:id",(req,res)=>{



    if (isNaN(req.params.id)) {
        res.statusCode = 400;
        res.sendStatus(400)
        //res.send("isso não é um número");
        } else {

            var id = parseInt(req.params.id);

          var game =  DB.games.find(ga => ga.id == id)

            if (game != undefined) {

                var {title, price, year} = req.body;
              
                if (title != undefined) {
                    game.title = title;
                }
                if (price != undefined) {
                    game.price = price;
                }
              if (year != undefined) {
                    game.year = year;
                }
                res.sendStatus(200)
            }else{
                res.sendStatus(404);
            }

            
    }

})
app.listen(5050,()=>{
    console.log("app rodando");
})