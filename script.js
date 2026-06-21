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