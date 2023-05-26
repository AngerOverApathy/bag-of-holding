let submitBtn = document.getElementById('submit')

const endpoints = [
    'https://www.dnd5eapi.co/api/equipment/{index}',
    'https://www.dnd5eapi.co/api/magic-items/{index}',
    'https://www.dnd5eapi.co/api/weapon-properties/{index}'
];
  
const fetchData = async (index) => {

    try {
        const convertedIndex = index.toLowerCase().split(' ').join('-'); // Convert to lowercase and replace spaces with hyphens
        const requests = endpoints.map(endpoint => fetch(endpoint.replace('{index}', convertedIndex))); //change 'index' to item user is searching for
        const responses = await Promise.all(requests); //Promise.all() method is used to handle multiple asynchronous requests simultaneously and wait for all of them to complete
        const data = await Promise.all(responses.map(response => response.json()));//data array is populated with the resolved JSON data from each response

        // Process the data from each endpoint
        const equipmentData = data[0];
        const magicItemsData = data[1];

        // Do something with the retrieved data
        console.log('Equipment Data:', equipmentData);
        const equipmentList = document.getElementById('equipment');

        if (Array.isArray(equipmentData)) {
            equipmentData.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item.name;
              equipmentList.appendChild(li);
            });
        }


        console.log('Magic Items Data:', magicItemsData);
        const magicItemsList = document.getElementById('magic-items');

        if (Array.isArray(magicItemsData)) {
            magicItemsData.forEach(item => {
              const li = document.createElement('li');
              li.textContent = item.name;
              magicItemsList.appendChild(li);
            });
        }

    } catch (error) {
        console.error('Error:', error);
    }
};

submitBtn.addEventListener('click', function() {
    const userInputIndex = document.getElementById('userInput').value;

    fetchData(userInputIndex);
  });
  