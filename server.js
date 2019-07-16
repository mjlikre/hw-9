const express = require('express');
var exphbs = require("express-handlebars");


const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


app.use('/api/burgers', require('./routes/apiRoutes')) ;

app.get('/', (req, res)=> res.render('index'));









const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`server started on ${PORT}`));