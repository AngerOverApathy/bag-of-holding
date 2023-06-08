document.addEventListener('DOMContentLoaded', () => {
  const seeMoreButtons = document.querySelectorAll('.see-more-button');
  const deleteButtons = document.querySelectorAll('.delete-button');

  seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const descriptionSection = button.parentNode.querySelector('.equipment-item-description');
      descriptionSection.classList.toggle('hidden');
      button.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
    });
  });

  deleteButtons.forEach(button => {
      button.addEventListener('click', () => {
      const equipmentId = button.getAttribute('data-id');
      deleteEquipment(equipmentId);
    });
  });

  function deleteEquipment(equipmentId) {
    // Send a DELETE request to the server to delete the equipment item
    fetch(`/equipment/${equipmentId}`, {
      method: 'DELETE'
    })
      .then(response => {
        if (response.ok) {
          // If the delete request was successful, remove the equipment item from the DOM
          const equipmentItem = button.parentNode;
          equipmentItem.remove();
        }
      })
      .catch(error => {
        console.error('Error deleting equipment item:', error);
      });
  }
});
