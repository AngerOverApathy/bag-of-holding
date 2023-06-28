const submitBtn = document.getElementById('submit');
const equipmentList = document.getElementById('equipment');
const magicItemsList = document.getElementById('magic-items');
const alertContainer = document.getElementById('alert-container');

// API endpoints
const endpoints = [
  'https://www.dnd5eapi.co/api/equipment/{index}',
  'https://www.dnd5eapi.co/api/magic-items/{index}',
  'https://www.dnd5eapi.co/api/weapon-properties/{index}'
];

// fetch data from the API
const fetchData = async (index) => {
    try {
      const convertedIndex = index.toLowerCase().split(' ').join('-'); // Convert to lowercase and replace spaces with hyphens
      const apiRequests = endpoints.map(endpoint => fetch(endpoint.replace('{index}', convertedIndex))); // Change 'index' to item user is searching for
      const apiResponses = await Promise.all(apiRequests); // Handle multiple asynchronous requests simultaneously
      const data = await Promise.all(apiResponses.map(response => response.json())); // Retrieve resolved JSON data from each response
  
      // process the data from each endpoint
      const equipmentData = data[0];
      const magicItemsData = data[1];
      const weaponPropertiesData = data[2];
  
      console.log('Equipment Data:', equipmentData);
      console.log('Magic Items Data:', magicItemsData);
      console.log('Weapon Properties Data:', weaponPropertiesData);
  
      if (equipmentData.equipment_category) { // If the fetched data is normal equipment, show normal equipment and save to the database
        // populateEquipmentList(equipmentData);
        saveEquipmentToDatabase(equipmentData); // Save equipment data to the database
      } else if (magicItemsData.index) { // If the fetched data is magical equipment, show magical equipment and save to the database
        // populateMagicItemsList(magicItemsData);
        saveMagicItemToDatabase(magicItemsData); // Save magic item data to the database
      } else {
        alertContainer.textContent = 'ITEM DOES NOT EXIST';
        alertContainer.style.display = 'block'; // Show the alert container
        console.error('Unknown data type:', data);
      }
  
    } catch (error) {
      alertContainer.textContent = 'An error occurred while fetching the item. Please try again later.';
      alertContainer.style.display = 'block'; // Show the alert container
      console.error('Error:', error);
    }
};

const saveEquipmentToDatabase = async (equipmentData) => {
  try {
    // Send a POST request to the server-side endpoint (/api/saveFetchedEquipment) with the equipment data
    const response = await fetch('/api/saveFetchedEquipment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(equipmentData),
    });

    if (response.ok) {
      console.log('Equipment saved successfully');
    } else {
      console.error('Failed to save equipment');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

const saveMagicItemToDatabase = async (magicItemData) => {
  try {
    // Send a POST request to the server-side endpoint (/api/saveMagicItem) with the magic item data
    const response = await fetch('/api/saveMagicItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(magicItemData),
    });

    if (response.ok) {
      console.log('Magic item saved successfully');
    } else {
      console.error('Failed to save magic item');
    }
  } catch (error) {
    console.error('Error:', error);
  }
};

// event listener for the submit button
submitBtn.addEventListener('click', async function(event) {
  event.preventDefault();
  const userInputIndex = document.getElementById('userInput').value;
  console.log(userInputIndex);

  try {
    await fetchData(userInputIndex);
    location.reload(); // Reload the page to display the new item
  } catch (error) {
    console.error('Error:', error);
    alertContainer.textContent = 'An error occurred while fetching the item. Please try again later.';
    alertContainer.style.display = 'block'; // Show the alert container
  }
});


