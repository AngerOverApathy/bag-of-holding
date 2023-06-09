const path = require('path');
const router = require('express').Router();

router.get('/', (req, res) => {
    res.render('index');
});

router.get('/js/formHandling.js', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/js/formHandling.js'));
});  

router.get('/css', (req, res) => {
  res.sendFile(path.join(__dirname, '../../public/style.css'));
});

module.exports = router;
