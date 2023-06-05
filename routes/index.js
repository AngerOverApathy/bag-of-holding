const router = require('express').Router()
const htmlRoutes = require('../routes/api/htmlRoutes')
const equipmentRoutes = require('../routes/api/equipmentRoutes.js')
const magicRoutes = require('../routes/api/magicRoutes.js')

router.use('/', htmlRoutes)
router.use('/', equipmentRoutes)
router.use('/', magicRoutes)


module.exports = router;