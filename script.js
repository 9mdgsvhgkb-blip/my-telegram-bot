const modal = document.getElementById("modal");
const openBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".modal-close");

openBtn.addEventListener("click", function (e) {
    e.preventDefault();
    modal.classList.add("active");
});

closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
});

modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
