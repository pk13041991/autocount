document.addEventListener('DOMContentLoaded', () => {
    // Include HTML for header and footer
    includeHTML();

    // Modal functionality
    const registrationModal = document.getElementById('registration-modal');
    const loginModal = document.getElementById('login-modal');
    const closeButtons = document.querySelectorAll('.close');

    document.querySelector('#register-button').addEventListener('click', () => {
        registrationModal.style.display = 'block';
    });

    document.querySelector('#login-button').addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            registrationModal.style.display = 'none';
            loginModal.style.display = 'none';
        });
    });

    window.addEventListener('click', event => {
        if (event.target == registrationModal) {
            registrationModal.style.display = 'none';
        }
        if (event.target == loginModal) {
            loginModal.style.display = 'none';
        }
    });
});
