const seeMoreButtons = document.querySelectorAll('.see-more-button');
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
