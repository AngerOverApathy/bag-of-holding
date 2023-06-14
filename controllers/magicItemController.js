const MagicItem = require('../models/magicItems');

// Handle the POST request to save magic item data
const saveMagicItem = async (req, res) => {
  try {
    // Extract the magic item data from the request body
    const magicItemData = req.body;
    // Create a new instance of the MagicItem model with the extracted data
    const magicItem = new MagicItem(magicItemData);
    // Save the magic item to the database
    await magicItem.save();
    // Send a success response
    res.status(200).json({ message: 'Magic item saved successfully' });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error('Error saving magic item:', error);
    res.status(500).json({ message: 'Failed to save magic item' });
  }
};

// Export the saveMagicItem function to make it accessible in other parts of the application
module.exports = {
  saveMagicItem,
};
