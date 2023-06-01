const submitBtn = document.getElementById('submit');
const equipmentList = document.getElementById('equipment');
const magicItemsList = document.getElementById('magic-items');

// API endpoints
const endpoints = [
  'https://www.dnd5eapi.co/api/equipment/{index}',
  'https://www.dnd5eapi.co/api/magic-items/{index}',
  'https://www.dnd5eapi.co/api/weapon-properties/{index}'
];

// Fetch data from the API
const fetchData = async (index) => {
    try {
      const convertedIndex = index.toLowerCase().split(' ').join('-'); // Convert to lowercase and replace spaces with hyphens
      const apiRequests = endpoints.map(endpoint => fetch(endpoint.replace('{index}', convertedIndex))); // Change 'index' to item user is searching for
      const apiResponses = await Promise.all(apiRequests); // Handle multiple asynchronous requests simultaneously
      const data = await Promise.all(apiResponses.map(response => response.json())); // Retrieve resolved JSON data from each response
  
      // Process the data from each endpoint
      const equipmentData = data[0];
      const magicItemsData = data[1];
      const weaponPropertiesData = data[2];
  
      console.log('Equipment Data:', equipmentData);
      console.log('Magic Items Data:', magicItemsData);
      console.log('Weapon Properties Data:', weaponPropertiesData);
  
      if (equipmentData.equipment_category) {
        populateEquipmentList(equipmentData);
      } else if (magicItemsData.index) {
        populateMagicItemsList(magicItemsData);
      } else {
        console.error('Unknown data type:', data);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
};
  

// Populate the equipment list on the page
const populateEquipmentList = (equipmentData) => {
    const li = document.createElement('li');
  
    const properties = equipmentData.properties ? equipmentData.properties.map(property => property.name).join(', ') : 'N/A';
    const throwRange = equipmentData.throw_range ? `Normal: ${equipmentData.throw_range.normal}, Long: ${equipmentData.throw_range.long}` : 'N/A';
    const twoHanded = equipmentData.two_handed_damage ? `${equipmentData.two_handed_damage.damage_dice}` : 'N/A';
  
    li.innerHTML = `
      <div class="equipment-item">
        <div class="equipment-item-header">
          <strong>Name:</strong> ${equipmentData.name}<br>
          <strong>Damage Type:</strong> ${equipmentData.damage ? equipmentData.damage.damage_type.name : 'N/A'}<br>
          <strong>Damage:</strong> ${equipmentData.damage.damage_dice}<br>
          <strong>Two-Handed Damage:</strong> ${twoHanded}<br>
          <strong>Range:</strong> Normal: ${equipmentData.range.normal}<br>
          <strong>Throw Range:</strong> ${throwRange}<br>
        </div>
        <div class="equipment-item-description hidden">
          <strong>Weapon Category:</strong> ${equipmentData.category_range}<br>
          <strong>Properties:</strong> ${properties}<br>
          <strong>Equipment Category:</strong> ${equipmentData.equipment_category.name}<br>
          <strong>Cost:</strong> ${equipmentData.cost.quantity} ${equipmentData.cost.unit}<br>
          <strong>Weight:</strong> ${equipmentData.weight}<br>
          <strong>Description:</strong> ${equipmentData.desc}<br>
        </div>
        <button class="equipment-see-more-button">See More</button>
      </div>
    `;
  
    const seeMoreButton = li.querySelector('.equipment-see-more-button');
    const descriptionSection = li.querySelector('.equipment-item-description');
  
    seeMoreButton.addEventListener('click', () => {
      descriptionSection.classList.toggle('hidden');
      seeMoreButton.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
    });
  
    equipmentList.appendChild(li);
};
  
// Populate the magic items list on the page
const populateMagicItemsList = (magicItemsData) => {
    const li = document.createElement('li');
  
    const itemCategories = magicItemsData.item_categories ? magicItemsData.item_categories.map(category => category.name).join(', ') : 'N/A';
    const damage = magicItemsData.damage ? magicItemsData.damage.damage_dice : 'N/A';
  
    li.innerHTML = `
      <div class="magic-item">
        <div class="magic-item-header">
          <strong>Name:</strong> ${magicItemsData.name}<br>
          <strong>Type:</strong> ${magicItemsData.equipment_category.name}<br>
        </div>
        <div class="magic-item-description hidden">
          <strong>Rarity:</strong> ${magicItemsData.rarity.name}<br>
          <strong>Description:</strong> ${magicItemsData.desc.join('<br>')}<br>
        </div>
        <button class="magic-item-see-more-button">See More</button>
      </div>
    `;
  
    const seeMoreButton = li.querySelector('.magic-item-see-more-button');
    const descriptionSection = li.querySelector('.magic-item-description');
  
    seeMoreButton.addEventListener('click', () => {
      descriptionSection.classList.toggle('hidden');
      seeMoreButton.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
    });
  
    magicItemsList.appendChild(li);
};
    

// Event listener for the submit button
submitBtn.addEventListener('click', async function() {
  const userInputIndex = document.getElementById('userInput').value;
  console.log(userInputIndex);

  await fetchData(userInputIndex);
});

// // Add Equipment function
// function addEquipment(event) {
//   event.preventDefault();

//   const name = document.querySelector('#equipmentName').value;
//   const categoryRange = document.querySelector('#equipmentCategory').value;
//   const costQuantity = document.querySelector('#costQuantity').value;
//   const costUnit = document.querySelector('#costUnit').value;
//   const damageDice = document.querySelector('#damageDice').value;
//   const damageTypeName = document.querySelector('#damageTypeName').value;

//   // Extract values for other equipment properties from the input fields

//   const newEquipment = {
//     name,
//     category_range: categoryRange,
//     cost: {
//       quantity: costQuantity,
//       unit: costUnit,
//     },
//     damage: {
//       damage_dice: damageDice,
//       damage_type: {
//         name: damageTypeName,
//       },
//     },
//     // Assign values for other equipment properties accordingly
//   };

//   // Send a POST request to the server to save the new equipment
//   fetch('/equipment', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newEquipment),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('New equipment added:', data);
//       // Update the equipment list on the page if desired
//     })
//     .catch(error => {
//       console.error('Error adding equipment:', error);
//     });
// }

// // Add Magic Item function
// function addMagicItem(event) {
//   event.preventDefault();

//   const name = document.querySelector('#magicItemName').value;
//   const equipmentCategoryName = document.querySelector('#equipmentCategoryName').value;
//   const rarityName = document.querySelector('#rarityName').value;
//   const description = document.querySelector('#description').value;

//   // Extract values for other magic item properties from the input fields

//   const newMagicItem = {
//     name,
//     equipmentCategory: {
//       name: equipmentCategoryName,
//     },
//     rarity: {
//       name: rarityName,
//     },
//     description,
//     // Assign values for other magic item properties accordingly
//   };

//   // Send a POST request to the server to save the new magic item
//   fetch('/magic-items', {
//     method: 'POST',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(newMagicItem),
//   })
//     .then(response => response.json())
//     .then(data => {
//       console.log('New magic item added:', data);
//       // Update the magic item list on the page if desired
//     })
//     .catch(error => {
//       console.error('Error adding magic item:', error);
//     });
// }

// // Attach event listeners to the "Add Equipment" and "Add Magic Item" buttons
// document.querySelector('#addEquipment').addEventListener('click', addEquipment);
// document.querySelector('#addMagicItem').addEventListener('click', addMagicItem);
