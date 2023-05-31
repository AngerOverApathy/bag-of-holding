const submitBtn = document.getElementById('submit');
const equipmentList = document.getElementById('equipment');
const magicItemsList = document.getElementById('magic-items');


const endpoints = [
    'https://www.dnd5eapi.co/api/equipment/{index}',
    'https://www.dnd5eapi.co/api/magic-items/{index}',
    'https://www.dnd5eapi.co/api/weapon-properties/{index}'
];
  
const fetchData = async (index) => {

    try {
        const convertedIndex = index.toLowerCase().split(' ').join('-'); // Convert to lowercase and replace spaces with hyphens
        const apiRequests = endpoints.map(endpoint => fetch(endpoint.replace('{index}', convertedIndex))); //change 'index' to item user is searching for
        const apiResponses = await Promise.all(apiRequests); //Promise.all() method is used to handle multiple asynchronous requests simultaneously and wait for all of them to complete
        const data = await Promise.all(apiResponses.map(response => response.json()));//data array is populated with the resolved JSON data from each response

        // Process the data from each endpoint
        const equipmentData = data[0];
        const magicItemsData = data[1];
        const weaponPropertiesData = data[2];


        console.log('Equipment Data:', equipmentData);
        console.log(equipmentData.name);
        console.log(equipmentData.category_range);
        console.log(equipmentData.cost.quantity);


        console.log('Magic Items Data:', magicItemsData);
        console.log('Weapon Properties Data:', weaponPropertiesData);
    
        populateEquipmentList(equipmentData);
    
        } catch (error) {
        console.error('Error:', error);
        }
    };
    
    const populateEquipmentList = (equipmentData) => {
        const equipmentList = document.getElementById('equipment');
        equipmentList.innerHTML = '';
      
        if (equipmentData) {
          const li = document.createElement('li');
      
          const properties = equipmentData.properties.map(property => property.name).join(', ');
          const throwRange = equipmentData.throw_range ? `Normal: ${equipmentData.throw_range.normal}, Long: ${equipmentData.throw_range.long}` : 'N/A';
      
          li.innerHTML = `
            <strong>Name:</strong> ${equipmentData.name}<br>
            <strong>Equipment Category:</strong> ${equipmentData.equipment_category.name}<br>
            <strong>Weapon Category:</strong> ${equipmentData.weapon_category}<br>
            <strong>Weapon Range:</strong> ${equipmentData.weapon_range}<br>
            <strong>Cost:</strong> ${equipmentData.cost.quantity} ${equipmentData.cost.unit}<br>
            <strong>Damage:</strong> ${equipmentData.damage.damage_dice}<br>
            <strong>Damage Type:</strong> ${equipmentData.damage.damage_type.name}<br>
            <strong>Range:</strong> Normal: ${equipmentData.range.normal}<br>
            <strong>Weight:</strong> ${equipmentData.weight}<br>
            <strong>Properties:</strong> ${properties}<br>
            <strong>Throw Range:</strong> ${throwRange}<br>
          `;
      
          equipmentList.appendChild(li);
        }
};
      

    
submitBtn.addEventListener('click', function() {
    const userInputIndex = document.getElementById('userInput').value;
    console.log(userInputIndex);

    fetchData(userInputIndex);
});