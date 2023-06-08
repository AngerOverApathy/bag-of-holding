document.addEventListener('DOMContentLoaded', () => {
  const seeMoreButtons = document.querySelectorAll('.see-more-button');

  seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const descriptionSection = button.parentNode.querySelector('.equipment-item-description');
      descriptionSection.classList.toggle('hidden');
      button.textContent = descriptionSection.classList.contains('hidden') ? 'See More' : 'See Less';
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