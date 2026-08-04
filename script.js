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

const nameInput = document.querySelector(".name");
const phoneInput = document.querySelector(".phone");

function formatNumber(value) {
    let formatted = "+7 ";

    if (value.length > 1) {
        formatted += "(" + value.substring(1, 4);
    }
    if (value.length >= 4) {
        formatted += ") " + value.substring(4, 7);
    }
    if (value.length >= 7) {
        formatted += "-" + value.substring(7, 9);
    }
    if (value.length >= 9) {
        formatted += "-" + value.substring(9, 11);
    }

    return formatted;
}

phoneInput.addEventListener("keydown", (e) => {

    if (e.key !== "Backspace") return;

    const pos = phoneInput.selectionStart;
    const value = phoneInput.value;

    if ([")", "-", " "].includes(value[pos - 1])) {

        e.preventDefault();

        let digits = value.replace(/\D/g, "");

        let digitIndex = value
            .slice(0, pos)
            .replace(/\D/g, "").length;

        digits =
            digits.slice(0, digitIndex - 1) +
            digits.slice(digitIndex);

        phoneInput.value = formatNumber(digits);
    }
});

phoneInput.addEventListener("input", () => {

    let value = phoneInput.value.replace(/\D/g, "");

    if (value.length === 0) {
        phoneInput.value = "+7 ";
        return;
    }

    if (!value.startsWith("7")) {
        value = "7" + value;
    }

    phoneInput.value = formatNumber(value);
});

phoneInput.addEventListener("focus", () => {

    if (phoneInput.value === "") {
        phoneInput.value = "+7 ";
    }

});

const form = document.querySelector(".modal form");

form.addEventListener("submit", function (e) {

    const name = nameInput.value.trim();

    if (!name) {
        e.preventDefault();
        alert("Введите имя.");
        nameInput.focus();
        return;
    }

    const digits = phoneInput.value.replace(/\D/g, "");

    if (!/^7\d{10}$/.test(digits)) {
        e.preventDefault();
        alert("Введите корректный номер телефона.");
        phoneInput.focus();
        return;
    }

});
