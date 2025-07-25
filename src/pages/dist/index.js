"use strict";
console.log("http://localhost:3000");
document.addEventListener('DOMContentLoaded', () => {
    const themeSelect = document.getElementById('theme-select');
    const body = document.body;
    const applyTheme = (theme) => {
        body.classList.remove('light-mode', 'dark-mode', 'device-mode');
        if (theme === 'light') {
            body.classList.add('light-mode');
        }
        else if (theme === 'dark') {
            body.classList.add('dark-mode');
        }
        else {
            body.classList.add('device-mode');
        }
    };
    const savedTheme = localStorage.getItem('theme') || 'device';
    applyTheme(savedTheme);
    if (themeSelect)
        themeSelect.value = savedTheme;
    if (themeSelect) {
        themeSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            localStorage.setItem('theme', value);
            applyTheme(value);
        });
    }
    const setupPasswordToggle = (inputId, btnId) => {
        const input = document.getElementById(inputId);
        const btn = document.getElementById(btnId);
        if (input && btn) {
            btn.addEventListener('click', () => {
                if (input.type === 'password') {
                    input.type = 'text';
                    btn.textContent = translations[currentLang].hide;
                }
                else {
                    input.type = 'password';
                    btn.textContent = translations[currentLang].show;
                }
            });
        }
    };
    setupPasswordToggle('password', 'toggle-password');
    setupPasswordToggle('confirm_password', 'toggle-confirm-password');
    const langSelect = document.getElementById('lang-select');
    const translations = {
        en: {
            signin: 'SIGN IN',
            register: 'REGISTER',
            username: 'Username:',
            password: 'Password:',
            confirm_password: 'Confirm Password:',
            email: 'Email:',
            signInBtn: 'Sign In',
            registerBtn: 'Register',
            toRegister: "Don't have an account? Register Here",
            toSignIn: 'Already have an account? Sign In Here',
            show: 'Show',
            hide: 'Hide',
            usernamePh: 'Enter your username',
            passwordPh: 'Enter your password',
            confirmPasswordPh: 'Confirm your password',
            emailPh: 'Enter your email',
        },
        th: {
            signin: 'เข้าสู่ระบบ',
            register: 'สมัครสมาชิก',
            username: 'ชื่อผู้ใช้:',
            password: 'รหัสผ่าน:',
            confirm_password: 'ยืนยันรหัสผ่าน:',
            email: 'อีเมล:',
            signInBtn: 'เข้าสู่ระบบ',
            registerBtn: 'สมัครสมาชิก',
            toRegister: 'ยังไม่มีบัญชี? สมัครที่นี่',
            toSignIn: 'มีบัญชีอยู่แล้ว? เข้าสู่ระบบ',
            show: 'แสดง',
            hide: 'ซ่อน',
            usernamePh: 'กรอกชื่อผู้ใช้',
            passwordPh: 'กรอกรหัสผ่าน',
            confirmPasswordPh: 'ยืนยันรหัสผ่าน',
            emailPh: 'กรอกอีเมล',
        }
    };
    let currentLang = localStorage.getItem('lang') || 'en';
    if (langSelect)
        langSelect.value = currentLang;
    const translatePage = (lang) => {
        const h1 = document.querySelector('h1');
        if (h1) {
            if (h1.textContent?.toUpperCase().includes('SIGN'))
                h1.textContent = translations[lang].signin;
            if (h1.textContent?.toUpperCase().includes('REGISTER'))
                h1.textContent = translations[lang].register;
        }
        const usernameLabel = document.querySelector('label[for="username"]');
        if (usernameLabel)
            usernameLabel.textContent = translations[lang].username;
        const passwordLabel = document.querySelector('label[for="password"]');
        if (passwordLabel)
            passwordLabel.textContent = translations[lang].password;
        const confirmPasswordLabel = document.querySelector('label[for="confirm_password"]');
        if (confirmPasswordLabel)
            confirmPasswordLabel.textContent = translations[lang].confirm_password;
        const emailLabel = document.querySelector('label[for="email"]');
        if (emailLabel)
            emailLabel.textContent = translations[lang].email;
        const usernameInput = document.getElementById('username');
        if (usernameInput)
            usernameInput.placeholder = translations[lang].usernamePh;
        const passwordInput = document.getElementById('password');
        if (passwordInput)
            passwordInput.placeholder = translations[lang].passwordPh;
        const confirmPasswordInput = document.getElementById('confirm_password');
        if (confirmPasswordInput)
            confirmPasswordInput.placeholder = translations[lang].confirmPasswordPh;
        const emailInput = document.getElementById('email');
        if (emailInput)
            emailInput.placeholder = translations[lang].emailPh;
        const signInBtn = document.querySelector('button[type="submit"]');
        if (signInBtn && signInBtn.textContent?.toLowerCase().includes('sign'))
            signInBtn.textContent = translations[lang].signInBtn;
        if (signInBtn && signInBtn.textContent?.toLowerCase().includes('register'))
            signInBtn.textContent = translations[lang].registerBtn;
        const togglePasswordBtn = document.getElementById('toggle-password');
        if (togglePasswordBtn)
            togglePasswordBtn.textContent = translations[lang].show;
        const toggleConfirmPasswordBtn = document.getElementById('toggle-confirm-password');
        if (toggleConfirmPasswordBtn)
            toggleConfirmPasswordBtn.textContent = translations[lang].show;
        const toRegister = document.querySelector('a[href="register.html"]');
        if (toRegister)
            toRegister.textContent = translations[lang].toRegister;
        const toSignIn = document.querySelector('a[href="signin.html"]');
        if (toSignIn)
            toSignIn.textContent = translations[lang].toSignIn;
    };
    translatePage(currentLang);
    if (langSelect) {
        langSelect.addEventListener('change', (e) => {
            const value = e.target.value;
            localStorage.setItem('lang', value);
            currentLang = value;
            translatePage(currentLang);
        });
    }
});
