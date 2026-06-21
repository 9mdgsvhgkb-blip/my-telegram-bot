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