const express = require('express');
const exphbs = require("express-handlebars");
const connection = require('./data/connection');


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use('/api/burgers', require('./routes/apiRoutes')) ;

// app.get('/', (req, res)=> res.render('index'));
app.get('/', (req, res)=>{
    connection.query('SELECT * FROM burgers;', function(err,data){
        if (err){
            return res.status(500).end
        }

        var food=[];
        for (var i = 0; i < data.length; i ++){
            if (!data[i].eaten == 1){
                food.push(data[i]);
       
            }
        }
        res.render('index', {burgers: food});
        
        
    })
})









const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server started on ${PORT}`));