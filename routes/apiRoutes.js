const express = require('express');
const router = express.Router();
const connection = require('../data/connection');

router.get('/', (req, res)=>{
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


router.post('/', (req, res)=>{
    newBurger ={
        burger : req.body.burger,
    }
    connection.query('INSERT INTO burgers SET ?',
    {
        burgerName : newBurger.burger,
    }),
    function(err){
        if (err) throw err;
        console.log('success')
    }
    res.redirect('/')
});

router.put("/:id", function(req, res) {
    connection.query("UPDATE burgers SET eaten = ? WHERE id = ?", [1, req.params.id], function(err, result) {
      if (err) {
        // If an error occurred, send a generic server failure
        return res.status(500).end();
      }
      else if (result.changedRows === 0) {
        // If no rows were changed, then the ID must not exist, so 404
        return res.status(404).end();
      }
      res.status(200).end();
  
    });
  });

module.exports=router;