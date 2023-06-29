const inventoryControls = document.querySelectorAll('.inventory-control');

// Create a map to store the inventory values for each item ID
const inventoryMap = new Map();

// Retrieve inventory values from local storage or initialize them to 0
inventoryControls.forEach(inventoryControl => {
  const itemId = inventoryControl.dataset.inventoryId;
  const storedValue = localStorage.getItem(itemId);
  const initialValue = storedValue ? parseInt(storedValue) : 0;
  inventoryMap.set(itemId, initialValue);
  const inputField = inventoryControl.querySelector('.inventory-input');
  inputField.value = initialValue;
});

// Function to update inventory value and save it to local storage
function updateInventory(itemId, value) {
  inventoryMap.set(itemId, value);
  localStorage.setItem(itemId, value);
}

// Iterate over each inventory control element
inventoryControls.forEach(inventoryControl => {
  const decrementBtn = inventoryControl.querySelector('.decrement-btn');
  const inputField = inventoryControl.querySelector('.inventory-input');
  const incrementBtn = inventoryControl.querySelector('.increment-btn');
  const itemId = inventoryControl.dataset.inventoryId;

  decrementBtn.addEventListener('click', () => {
    let currentValue = inventoryMap.get(itemId);
    if (currentValue > 0) {
      currentValue--;
      updateInventory(itemId, currentValue);
      inputField.value = currentValue;
    }
  });

  incrementBtn.addEventListener('click', () => {
    let currentValue = inventoryMap.get(itemId);
    currentValue++;
    updateInventory(itemId, currentValue);
    inputField.value = currentValue;
  });
});
