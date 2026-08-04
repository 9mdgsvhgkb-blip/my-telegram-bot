const modal = document.getElementById("modal");
const openBtn = document.querySelector(".open-modal");
const closeBtn = document.querySelector(".modal-close");
const form = modal.querySelector("form");

let canSubmit = false;

openBtn.addEventListener("click", function (e) {
    e.preventDefault();

    modal.classList.add("active");

    canSubmit = false;
    setTimeout(() => {
        canSubmit = true;
    }, 1000);
});

form.addEventListener("submit", function (e) {
    if (!canSubmit) {
        e.preventDefault();
    }
});

closeBtn.addEventListener("click", function () {
    modal.classList.remove("active");
});

modal.addEventListener("click", function (e) {
    if (e.target === modal) {
        modal.classList.remove("active");
    }
});
