const path = require('path');
const router = require('express').Router()

router.get('/', (req, res) => {           //return index.html 
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

module.exports = router;