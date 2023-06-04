const path = require('path');
const router = require('express').Router()

router.get('/', (req, res) => {           //return index.html 
    res.sendFile(path.join(__dirname, '../public/index.html'));
})

router.get('/js/app.js', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/app.js'));
});  

router.get('/css', (req, res) => {        
    res.sendFile(path.join(__dirname, '../public/style.css'));
})


module.exports = router;