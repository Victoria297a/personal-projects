const starGroups = document.querySelectorAll(".stars.interactive");

starGroups.forEach((group) => {
  const stars = group.querySelectorAll(".star");
  const hiddenInput = group.closest("label")?.querySelector("input[type='hidden']");

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      const value = Number(star.dataset.value);
      stars.forEach((s) => s.classList.toggle("active", Number(s.dataset.value) <= value));
      if (hiddenInput) {
        hiddenInput.value = String(value);
      }
    });
  });
});

const searchButtons = document.querySelectorAll("#search-btn, .search button");

searchButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    const input = btn.parentElement?.querySelector("input[type='search']");
    if (!input) return;
    if (input.value.trim().length === 0) {
      alert("Type a keyword to search.");
      return;
    }
    alert(`Searching for: ${input.value}`);
  });
});

const forms = document.querySelectorAll("form");
forms.forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    alert("This is a demo form. Connect a backend to make it live.");
  });
});
