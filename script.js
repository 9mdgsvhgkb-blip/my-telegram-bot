function showToast(message, type = 'error') {
    const toast = document.getElementById('toast');

    toast.textContent = message;
    toast.className = '';
    toast.classList.add(type);
    toast.classList.add('show');

    clearTimeout(toast.timer);

    toast.timer = setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}

const form = document.querySelector('.form');

if (form) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                form.classList.add('show');
            }
        });
    }, {
        threshold: 0.2
    });

    observer.observe(form);
}

const cards = document.querySelectorAll('.adv-card');

const cardsObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {

        if (entry.isIntersecting) {

            setTimeout(() => {
                entry.target.classList.add('show');
            }, index * 200);

            cardsObserver.unobserve(entry.target);
        }

    });
}, {
    threshold: 0.2
});

cards.forEach(card => {
    cardsObserver.observe(card);
});

const phoneInput = document.querySelector('.phone');

phoneInput.addEventListener('keydown', (e) => {
    if (e.key !== 'Backspace') return;

    const pos = phoneInput.selectionStart;
    const value = phoneInput.value;

    // если слева от курсора символ маски
    if ([')', '-', ' '].includes(value[pos - 1])) {
        e.preventDefault();

        let digits = value.replace(/\D/g, '');

        // сколько цифр находится слева от курсора
        let digitIndex = value
            .slice(0, pos)
            .replace(/\D/g, '').length;

        // удаляем предыдущую цифру
        digits =
            digits.slice(0, digitIndex - 1) +
            digits.slice(digitIndex);

        phoneInput.value = formatNumber(digits);
    }
});

function formatNumber(value) {
    let formatted = '+7 ';

    if (value.length > 1) {
        formatted += '(' + value.substring(1, 4);
    }
    if (value.length >= 4) {
        formatted += ') ' + value.substring(4, 7);
    }
    if (value.length >= 7) {
        formatted += '-' + value.substring(7, 9);
    }
    if (value.length >= 9) {
        formatted += '-' + value.substring(9, 11);
    }

    return formatted;
}

phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');

    // всегда фиксируем 7 как начало
    if (value.length === 0) {
        phoneInput.value = '+7 ';
        return;
    }

    if (!value.startsWith('7')) {
        value = '7' + value;
    }

    phoneInput.value = formatNumber(value);
});

phoneInput.addEventListener('focus', () => {
    if (phoneInput.value === '') {
        phoneInput.value = '+7 ';
    }
});

const sendBtn = document.querySelector('.send-btn');

sendBtn.addEventListener('click', () => {
    const digits = phoneInput.value.replace(/\D/g, '');

    if (digits.length <= 1) {
        showToast('Введите номер телефона');
        return;
    }

    if (!/^7\d{10}$/.test(digits)) {
        showToast('Введите корректный номер телефона');
        return;
    }

    showToast('Заявка отправлена!', 'success');
});

const track = document.querySelector('.works-track');

track.innerHTML += track.innerHTML;

const quizSteps = document.querySelectorAll('.quiz-step');
const quizOptions = document.querySelectorAll('.quiz-option');
const currentStep = document.getElementById('current-step');

let current = 0;

quizOptions.forEach(option => {
    option.addEventListener('click', () => {

        quizSteps[current].classList.remove('active');

        current++;

        if (current < quizSteps.length) {
            quizSteps[current].classList.add('active');
        }

        if (currentStep) {
            currentStep.textContent = Math.min(current + 1, 4);
        }

        updateBackButton();

    });
});

const backBtn = document.querySelector('.quiz-back');

backBtn.addEventListener('click', () => {

    if (current === 0) return;

    quizSteps[current].classList.remove('active');

    current--;

    quizSteps[current].classList.add('active');

    currentStep.textContent = current + 1;

    updateBackButton();

});

function updateBackButton() {
    backBtn.style.display = current === 0 ? 'none' : 'flex';
}

updateBackButton();

const customInput = document.querySelector('.quiz-custom');
const customNext = document.querySelector('.quiz-custom-next');

customInput.addEventListener('input', () => {

    if (customInput.value.trim()) {
        customNext.classList.add('show');
    } else {
        customNext.classList.remove('show');
    }

});

customNext.addEventListener('click', () => {

    if (!customInput.value.trim()) return;

    quizSteps[current].classList.remove('active');

    current++;

    if (current < quizSteps.length) {
        quizSteps[current].classList.add('active');
    }

    currentStep.textContent = Math.min(current + 1, 4);

    updateBackButton();

});

const quizData = {
    demolitionType: '',
    area: '',
    trashRemoval: '',
    phone: ''
};

quizOptions.forEach(option => {
    option.addEventListener('click', () => {

        const answer = option.textContent.trim();

        if(current === 0){

            const types = {
                'Квартиру': 'Квартира',
                'Офис': 'Офис',
                'Дом': 'Дом',
                'Коммерческое помещение': 'Коммерческое помещение'
            };

        quizData.demolitionType = types[answer] || answer;
    }

        if(current === 1){
            quizData.area = answer;
        }

        if(current === 2){
            quizData.trashRemoval =
                answer === 'Да'
                    ? 'С вывозом мусора'
                    : 'Без вывоза мусора';
        }

        quizSteps[current].classList.remove('active');

        current++;

        if(current < quizSteps.length){
            quizSteps[current].classList.add('active');
        }

        currentStep.textContent = Math.min(current + 1, 4);

        updateBackButton();
    });
});

customNext.addEventListener('click', () => {

    if(!customInput.value.trim()) return;

    quizData.objectType = customInput.value.trim();

    quizSteps[current].classList.remove('active');

    current++;

    quizSteps[current].classList.add('active');

    currentStep.textContent = current + 1;

    updateBackButton();

});

const quizSubmit = document.querySelector('.quiz-submit');

quizSubmit.addEventListener('click', () => {

    const phone = document.querySelector('.quiz-phone').value.trim();

    quizData.phone = phone;

    console.log(quizData);

});


