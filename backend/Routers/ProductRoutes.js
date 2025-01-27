
const router = require('express').Router();

router.get('/', (req, res)=>{
    res.status(200).json([
        {
            name:"mouse",
            price:1000
        },
        {
            name:"battery",
            price:3800
        }
    ])
});


module.exports = router;