const router = require('express').Router()

//define the API endpoints for accessing equipment-related data.
//The router handles HTTP requests to these endpoints and maps them to the corresponding controller methods.

const {
    getAllEquipment,
    getEquipmentById,
    createEquipment,
    updateEquipment,
    deleteEquipment
  } = require('../controllers/equipmentController.js');
  
  // /api/Equipments
  router
    .route('/')
    .get(getAllEquipment)
    .post(createEquipment);
  
  // /api/Equipments/:id
  router
    .route('/:id')
    .get(getEquipmentById)
    .put(updateEquipment)
    .delete(deleteEquipment);
  
  module.exports = router;