navLinks.forEach(link => {
    link.onclick = () => {
        navbar.classList.remove('active');
        menuIcon.classList.remove('bx-x');
    }
});
let offset = sec.offsetTop - 100;
