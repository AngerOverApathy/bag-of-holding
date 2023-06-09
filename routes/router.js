const router = require('express').Router()
const htmlRoutes = require('./api/htmlRoutes')
const equipmentRoutes = require('./api/equipmentRoutes.js')
// const magicRoutes = require('./api/magicRoutes.js')

router.use('/', htmlRoutes)
router.use('/equipment', equipmentRoutes)
// router.use('/', magicRoutes)


module.exports = router;