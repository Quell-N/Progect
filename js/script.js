
async function loadComponent(selector, path) {
    const response = await fetch(path);
    if (!response.ok) return;
    document.querySelector(selector).innerHTML = await response.text();
}

function applyTheme(theme) {
    if (theme === 'dark') {
        document.body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = 'светлая тема';
    } else {
        document.body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
        const icon = document.getElementById('theme-icon');
        if (icon) icon.textContent = 'темная тема';
    }
}

window.addEventListener("load", async () => {
    // 👇 ИСПРАВЛЕНО: пути от корня сайта
    await loadComponent("header", "/components/header.html");
    await loadComponent("footer", "/components/footer.html");

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        applyTheme('dark');
    } else {
        document.body.classList.remove('dark-theme');
    }

    const burger = document.querySelector("#burger");
    if (burger) {
        burger.addEventListener("click", (event) => {
            const links = document.querySelectorAll(".header__link");
            Array.from(links).forEach(link => {
                link.classList.add("header__link--show");
            });
        });
    }
});

document.body.addEventListener("click", (event) => {
    const themeButton = event.target.closest("#theme-toggle");
    if (themeButton) {
        event.preventDefault();
        const isDark = document.body.classList.contains("dark-theme");
        applyTheme(isDark ? "light" : "dark");
        return;
    }

    const header = document.querySelector("header");
    const aside = document.querySelector("aside");
    const burger = document.querySelector("#burger");
    if (event.target != header && event.target != aside && event.target != burger) {
        const links = document.querySelectorAll(".header__link");
        Array.from(links).forEach(link => {
            link.classList.remove("header__link--show");
        });
    }
});



const form = document.getElementById('feedback-form');
if (form) {
    form.addEventListener('submit', function(event) {
        event.preventDefault(); 
        document.querySelectorAll('.error-message').forEach(el => el.textContent = '');

        let isValid = true;
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();

        
        if (name === '') {
            document.getElementById('name-error').textContent = 'Введите ваше имя';
            isValid = false;
        } else if (name.length < 2) {
            document.getElementById('name-error').textContent = 'Имя должно содержать хотя бы 2 символа';
            isValid = false;
        }

      
        const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/;
        if (email === '') {
            document.getElementById('email-error').textContent = 'Введите email';
            isValid = false;
        } else if (!emailRegex.test(email)) {
            document.getElementById('email-error').textContent = 'Введите корректный email (например, name@domain.com)';
            isValid = false;
        }

        
        if (message === '') {
            document.getElementById('message-error').textContent = 'Введите сообщение';
            isValid = false;
        } else if (message.length < 10) {
            document.getElementById('message-error').textContent = 'Сообщение должно быть не менее 10 символов';
            isValid = false;
        }

        
        if (isValid) {
            console.log('=== Новая заявка с сайта ===');
            console.log('Имя:', name);
            console.log('Email:', email);
            console.log('Сообщение:', message);
            console.log('Телефон менеджера: +79914071121');
            console.log('=============================');
            alert('Спасибо! Ваше сообщение отправлено (в консоль).');
            form.reset();
        }
    });
}