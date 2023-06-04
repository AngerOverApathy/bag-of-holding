const router = require('express').Router()
const htmlRoutes = require('./htmlRoutes')
const equipmentRoutes = require('./equipmentRoutes')

router.use('/', htmlRoutes)
router.use('/equipment', equipmentRoutes)


module.exports = router;