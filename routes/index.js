const router = require('express').Router()
const htmlRoutes = require('./api/htmlRoutes')
const equipmentRoutes = require('./api/equipmentRoutes')

router.use('/', htmlRoutes)
router.use('/equipment', equipmentRoutes)


module.exports = router;