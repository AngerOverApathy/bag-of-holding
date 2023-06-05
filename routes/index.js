const router = require('express').Router()
const htmlRoutes = require('routes/api/htmlRoutes.js')
const equipmentRoutes = require('routes/api/equipmentRoutes.js')

router.use('/', htmlRoutes)
router.use('/api', equipmentRoutes)


module.exports = router;