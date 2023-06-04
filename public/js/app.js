const submitBtn = document.getElementById('submit');
const equipmentList = document.getElementById('equipment');
const magicItemsList = document.getElementById('magic-items');

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
        populateEquipmentList(equipmentData);
        saveEquipmentToDatabase(equipmentData); // Save equipment data to the database
      } else if (magicItemsData.index) { // If the fetched data is magical equipment, show magical equipment and save to the database
        populateMagicItemsList(magicItemsData);
        saveMagicItemToDatabase(magicItemsData); // Save magic item data to the database
      } else {
        console.error('Unknown data type:', data);
      }
  
    } catch (error) {
      console.error('Error:', error);
    }
};
  
//populate equipment list
const populateEquipmentList = (equipmentData) => {
    const li = document.createElement('li');
  
    const properties = equipmentData.properties ? equipmentData.properties.map(property => property.name).join(', ') : 'N/A';
    const throwRange = equipmentData.throw_range ? `Normal: ${equipmentData.throw_range.normal}, Long: ${equipmentData.throw_range.long}` : 'N/A';
    const twoHanded = equipmentData.two_handed_damage ? `${equipmentData.two_handed_damage.damage_dice}` : 'N/A';
  
    const damage = equipmentData.damage ? equipmentData.damage.damage_dice : 'N/A';
    const rangeNormal = equipmentData.range ? equipmentData.range.normal : 'N/A';
  
    const description = equipmentData.desc ? `<strong>Description:</strong> ${equipmentData.desc}<br>` : '';
  
    li.innerHTML = `
      <div class="equipment-item">
        <div class="equipment-item-header">
          <strong>Name:</strong> ${equipmentData.name}<br>
          </div>
          <div class="equipment-item-description hidden">
          <strong>Damage / Type:</strong> ${damage} ${equipmentData.damage ? equipmentData.damage.damage_type.name : 'N/A'}<br>
          ${equipmentData.two_handed_damage ? `<strong>Two-Handed Damage:</strong> ${twoHanded}<br>` : ''}
          <strong>Range:</strong> Normal: ${rangeNormal}<br>
          ${equipmentData.throw_range ? `<strong>Throw Range:</strong> ${throwRange}<br>` : ''}
          <strong>Weapon Category:</strong> ${equipmentData.category_range}<br>
          <strong>Properties:</strong> ${properties}<br>
          <strong>Equipment Category:</strong> ${equipmentData.equipment_category.name}<br>
          <strong>Cost:</strong> ${equipmentData.cost.quantity} ${equipmentData.cost.unit}<br>
          <strong>Weight:</strong> ${equipmentData.weight}<br>
          ${description}
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
  
// populate the magic items list on the page
const populateMagicItemsList = (magicItemsData) => {
    const li = document.createElement('li');
  
    const itemCategories = magicItemsData.item_categories ? magicItemsData.item_categories.map(category => category.name).join(', ') : 'N/A';
    const damage = magicItemsData.damage ? magicItemsData.damage.damage_dice : 'N/A';
  
    li.innerHTML = `
      <div class="magic-item">
        <div class="magic-item-header">
          <strong>Name:</strong> ${magicItemsData.name}<br>
          </div>
          <div class="magic-item-description hidden">
          <strong>Type:</strong> ${magicItemsData.equipment_category.name}<br>
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

// event listener for the submit button
submitBtn.addEventListener('click', async function(event) {
  event.preventDefault();
  const userInputIndex = document.getElementById('userInput').value;
  console.log(userInputIndex);

  await fetchData(userInputIndex);
});

