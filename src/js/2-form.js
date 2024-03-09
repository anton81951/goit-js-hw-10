const form = document.querySelector(".feedback-form");
const localStorageKey = "feedback-form-state";

const savedState = JSON.parse(localStorage.getItem(localStorageKey)) || {};
form.elements.email.value = savedState.email || "";
form.elements.message.value = savedState.message || "";

form.addEventListener("input", (evt) => {
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();
  const infoObject = { email, message };
  localStorage.setItem(localStorageKey, JSON.stringify(infoObject));
}); 

form.addEventListener("submit", (evt) => {
  evt.preventDefault();
  const email = form.elements.email.value.trim();
  const message = form.elements.message.value.trim();

  if (email === "" || message === "") {
    return alert("All form fields must be filled in");
  }

  console.log({ email, message });
  localStorage.removeItem(localStorageKey);
  form.reset();
});
