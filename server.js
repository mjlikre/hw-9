const express = require('express');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());









const PORT = process.env.PORT || 8080;

app.listen(PORT, ()=> console.log(`server started on ${PORT}`));