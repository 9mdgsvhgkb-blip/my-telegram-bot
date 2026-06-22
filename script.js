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

const slider = document.querySelector('.works-slider');

const images = [
    'work1.jpg',
    'work2.jpg',
    'work3.jpg',
    'work4.jpg',
    'work5.jpg',
    'work6.jpg',
    'work7.jpg',
    'work8.jpg'
];

function createCard(src) {
    const card = document.createElement('div');
    card.className = 'work-card';

    const img = document.createElement('img');
    img.src = src;

    card.appendChild(img);

    return card;
}

// стартовые карточки
for (let i = 0; i < 12; i++) {
    const random = images[Math.floor(Math.random() * images.length)];
    slider.appendChild(createCard(random));
}

function animate() {
    const firstCard = slider.firstElementChild;

    firstCard.style.marginLeft = '-2px';

    const current =
        parseFloat(firstCard.dataset.offset || 0) - 1;

    firstCard.dataset.offset = current;
    firstCard.style.transform = `translateX(${current}px)`;

    if (Math.abs(current) >= firstCard.offsetWidth + 25) {
        firstCard.remove();

        const random =
            images[Math.floor(Math.random() * images.length)];

        slider.appendChild(createCard(random));
    }

    requestAnimationFrame(animate);
}

animate();