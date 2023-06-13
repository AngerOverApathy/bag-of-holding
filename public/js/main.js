const seeMoreButtons = document.querySelectorAll('.see-more-button');
const updateButton = document.querySelector('.update-button')
const deleteButton = document.querySelector('.delete-button')

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

function toggleForm() {
  let form = document.getElementById("equipmentForm");
  if (form.style.display === "none") {
    form.style.display = "block";
  } else {
    form.style.display = "none";
  }
}

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

function handleUpdateFormSubmit(event, equipmentId) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const formDataObject = Object.fromEntries(formData.entries());
  const updateUrl = `/equipment/${equipmentId}`;

  fetch(updateUrl, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formDataObject),
  })
    .then(response => response.json())
    .then(updatedEquipment => {
      console.log('Equipment updated successfully:', updatedEquipment);
      // Update the UI with the updated equipment data here

      // Reload the page to reflect the changes
      location.reload();
    })
    .catch(error => {
      console.error('Failed to update equipment:', error);
      // Handle the error and show an error message to the user
    });
}

// Function to handle the update button click event
function handleUpdateButtonClick(equipmentId) {
  // Find the corresponding form element
  const updateForm = document.getElementById(`updateForm-${equipmentId}`);

  // Attach the form submission handler
  updateForm.addEventListener('submit', event => handleUpdateFormSubmit(event, equipmentId));

  // Show the update form
  updateForm.style.display = 'block';
}

