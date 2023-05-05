const express = require('express'),
      router = express.Router()

router.get("/" , (req , res) => { 
    res.send('<h1> Api Router file </h1>')
})

module.exports = router;