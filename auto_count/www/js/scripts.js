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

// JavaScript for Slideshow
let slideIndex = 0;
showSlides();

function showSlides() {
    let slides = document.getElementsByClassName("mySlides");
    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";  
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }    
    slides[slideIndex-1].style.display = "block";  
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}
