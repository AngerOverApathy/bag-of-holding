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

document.addEventListener('DOMContentLoaded', () => {
  const deleteButtons = document.querySelectorAll('.delete-button');

  deleteButtons.forEach((button) => {
    button.addEventListener('click', (event) => {
      const equipmentId = event.target.dataset.equipmentId;

      if (equipmentId) {
        fetch(`/api/Equipment/${equipmentId}`, {
          method: 'DELETE',
        })
          .then((response) => {
            if (response.ok) {
              // Refresh the page after successful deletion
              location.reload();
            } else {
              console.error('Failed to delete equipment');
            }
          })
          .catch((error) => {
            console.error('Failed to delete equipment:', error);
          });
      }
    });
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

