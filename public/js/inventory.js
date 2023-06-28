const form = document.getElementById('equipmentForm');
const closeButton = document.getElementById('close-button');
const formSection = document.getElementById('create-form');

// Function to save inventory value to local storage
const saveInventoryValue = (inventoryId, value) => {
    localStorage.setItem(inventoryId, value);
};
  
// Function to load inventory value from local storage
const loadInventoryValue = (inventoryId) => {
    return localStorage.getItem(inventoryId) || '0';
};

document.addEventListener('DOMContentLoaded', function() {
    // Get all the inventory controls
    const inventoryControls = document.querySelectorAll('.inventory-control');
  
    // Iterate over each inventory control
    inventoryControls.forEach(function(inventoryControl) {
      const decrementButton = inventoryControl.querySelector('.decrement-btn');
      const incrementButton = inventoryControl.querySelector('.increment-btn');
      const inventoryInput = inventoryControl.querySelector('.inventory-input');
  
      // Get the unique identifier for the fetched item
      const itemId = inventoryControl.dataset.inventoryId;
  
      // Add event listener to the decrement button
      decrementButton.addEventListener('click', function() {
        decrementInventory(inventoryInput, itemId);
      });
  
      // Add event listener to the increment button
      incrementButton.addEventListener('click', function() {
        incrementInventory(inventoryInput, itemId);
      });
  
      // Retrieve the saved value from local storage
      const savedInventory = localStorage.getItem(itemId);
      if (savedInventory !== null) {
        inventoryInput.value = savedInventory;
      }
});
  
// Function to handle decrementing inventory
function decrementInventory(inputElement, itemId) {
      let inventoryValue = parseInt(inputElement.value);
      if (inventoryValue > 0) {
        inventoryValue--;
        inputElement.value = inventoryValue;
        saveToLocalStorage(itemId, inventoryValue);
      }
    }
  
    // Function to handle incrementing inventory
    function incrementInventory(inputElement, itemId) {
      let inventoryValue = parseInt(inputElement.value);
      inventoryValue++;
      inputElement.value = inventoryValue;
      saveToLocalStorage(itemId, inventoryValue);
    }
  
    // Function to save the inventory value to local storage
    function saveToLocalStorage(itemId, value) {
      localStorage.setItem(itemId, value);
    }
});


  
// Close form button
closeButton.addEventListener('click', function() {
    let isFormSubmitted = false; // Flag to track form submission
    formSection.style.display = 'none';
    if (!isFormSubmitted) {
    // Reset the input values
    const formInputs = formSection.querySelectorAll('input');
    formInputs.forEach(input => {
        input.value = '';
    });
    }
  isFormSubmitted = false; // Reset the submission status
});

// Form submit event
form.addEventListener('submit', function() {
  isFormSubmitted = true; // Set the submission status to true
  document.getElementById('formSubmittedInput').value = '1'; // Set the value to indicate form submission
});
  