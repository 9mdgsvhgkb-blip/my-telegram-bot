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

phoneInput.addEventListener('focus', () => {
    if (phoneInput.value === '') {
        phoneInput.value = '+7 ';
    }
});

phoneInput.addEventListener('input', () => {
    let value = phoneInput.value.replace(/\D/g, '');

    if (value.length <= 1) {
        phoneInput.value = '';
        return;
    }

    if (!value.startsWith('7')) {
        value = '7' + value;
    }

    let formatted = '+7 ';

    if (value.length > 1) {
        formatted += '(' + value.substring(1, 4);
    }
    if (value.length >= 4) {
        formatted += ') ';
        formatted += value.substring(4, 7);
    }
    if (value.length >= 7) {
        formatted += '-';
        formatted += value.substring(7, 9);
    }
    if (value.length >= 9) {
        formatted += '-';
        formatted += value.substring(9, 11);
    }

    phoneInput.value = formatted;
});

phoneInput.addEventListener('blur', () => {
    if (phoneInput.value === '+7 ' || phoneInput.value === '') {
        phoneInput.value = '';
    }
});