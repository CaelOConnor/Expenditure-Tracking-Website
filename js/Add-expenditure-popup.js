const addBtn = document.getElementById("add-expense");
  const popup = document.querySelector(".add-item-popup");

  addBtn.addEventListener("click", () => {
    popup.style.display = "block";
  });

const closeBtn = document.getElementById("close-popup-btn");

closeBtn.addEventListener("click", () => {
  popup.style.display = "none";
});