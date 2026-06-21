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

const bigTitle = document.querySelector('.big-title');
const city = document.querySelector('.city');

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            bigTitle.classList.add('show');
            city.classList.add('show');
        }
    });
}, {
    threshold: 0.3
});

observer.observe(document.querySelector('.hero'));