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
          li.innerHTML = `
            <strong>Name:</strong> ${equipmentData.name}<br>
            <strong>Category:</strong> ${equipmentData.category_range}<br>
            <strong>Cost:</strong> ${equipmentData.cost.quantity} ${equipmentData.cost.unit}<br>
            <strong>Damage:</strong> ${equipmentData.damage.damage_dice}<br>
            <strong>Damage Type:</strong> ${equipmentData.damage.damage_type.name}<br>
            <strong>Range:</strong> Long: ${equipmentData.range.long}, Normal: ${equipmentData.range.normal}<br>
            <strong>Weight:</strong> ${equipmentData.weight}
          `;
          equipmentList.appendChild(li);
        }
};

    
submitBtn.addEventListener('click', function() {
    const userInputIndex = document.getElementById('userInput').value;
    console.log(userInputIndex);

    fetchData(userInputIndex);
});