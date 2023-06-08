document.addEventListener('DOMContentLoaded', () => {
  const seeMoreButtons = document.querySelectorAll('.see-more-button');

  seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const descriptionSection = button.parentNode.querySelector('.equipment-item-description');
      descriptionSection.classList.toggle('hidden');
      button.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
    });
  });
  
  deleteForms.forEach(form => {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const confirmation = confirm('Are you sure you want to delete this equipment?');
      if (confirmation) {
        const url = form.getAttribute('action');
        const method = form.querySelector('input[name="_method"]').value;
        fetch(url, {
          method: method
        })
          .then(response => response.json())
          .then(data => {
            // Handle success or display error message
            console.log(data);
          })
          .catch(error => {
            console.error(error);
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