const seeMoreButtons = document.querySelectorAll('.see-more-button');

// Iterate over each button
seeMoreButtons.forEach(button => {
  button.addEventListener('click', () => {
    // Find the parent item
    const item = button.parentNode;
    const descriptionSection = item.querySelector('.item-description');
    descriptionSection.classList.toggle('hidden');
    // Update the button text based on the visibility state
    button.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
  });
});

//show creation form
function toggleForm() {
  let form = document.getElementById("equipmentForm");
  form.classList.toggle("hidden");
}

//update user-created equipment
function handleUpdateFormSubmit(event, equipmentId) {
  event.preventDefault(); // Prevent the default form submission behavior

  const formData = new FormData(event.target); // Get the form data
  const formDataObject = Object.fromEntries(formData.entries()); // Convert form data to a plain object
  const updateUrl = `/equipment/${equipmentId}`; // Construct the update URL

  // Handle the boolean value separately
  formDataObject.requiresAttunement = event.target.elements[`requiresAttunement-${equipmentId}`].checked;

  // Update the equipment
  fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json', // Set the request content type to JSON
    },
    body: JSON.stringify(formDataObject), // Convert the form data object to JSON
  })
    .then(response => response.json()) // Parse the response as JSON
    .then(updatedEquipment => {
      console.log('Equipment updated successfully:', updatedEquipment);
      // Update the UI with the updated equipment data here
      // Reload the page to reflect the changes
      location.reload();
    })
    .catch(error => {
      console.error('Failed to update equipment:', error);
      location.reload(); // Handle the error and show an error message to the user
    });

  // Toggle the visibility of the buttons
  const updateButton = document.getElementById(`updateButton-${equipmentId}`);
  const saveButton = document.getElementById(`saveButton-${equipmentId}`);
  updateButton.style.display = 'block';
  saveButton.style.display = 'none';
}

// Function to handle the update button click event
function handleUpdateButtonClick(equipmentId) {
  // Find the corresponding form element
  const updateForm = document.getElementById(`updateForm-${equipmentId}`);
  // Attach the form submission handler
  updateForm.addEventListener('submit', event => handleUpdateFormSubmit(event, equipmentId));
  // Show the update form
  updateForm.style.display = 'block';

  // Toggle the visibility of the buttons
  const updateButton = document.getElementById(`updateButton-${equipmentId}`);
  const saveButton = document.getElementById(`saveButton-${equipmentId}`);
  updateButton.style.display = 'none';
  saveButton.style.display = 'block';
}

//delete user-created equipment
function deleteEquipment(id) {
  const confirmed = confirm("Are you sure you want to delete this equipment?");
  if (confirmed) {
    // Send a DELETE request to the server
    fetch(`/equipment/${id}`, {
      method: 'DELETE'
    })
      .then(() => {
        // Reload the page to reflect the updated equipment list
        location.reload();
      })
      .catch(error => {
        console.error('Failed to delete equipment:', error);
        // Handle error as needed
      });
  }
}

// delete button click event for fetched equipment
document.addEventListener('DOMContentLoaded', function() {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      const equipmentId = button.getAttribute('fetched-data-equipment-id');
      deleteFetchedEquipment(equipmentId);
    });
  });
});

function deleteFetchedEquipment(equipmentId) {
  // Send a DELETE request to the server
  fetch(`/api/saveFetchedEquipment/${equipmentId}`, {
    method: 'DELETE'
  })    
    .then(function(response) {
      if (response.ok) {
        // Reload the page to reflect the updated equipment list
        location.reload();
      } else {
        console.error('Failed to delete equipment:', response.statusText);
        // Handle error as needed
      }
    })
    .catch(function(error) {
      console.error('Failed to delete equipment:', error);
      // Handle error as needed
    });
}
