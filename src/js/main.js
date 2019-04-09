let sandwichMenuOpen = document.getElementsByClassName('sandwich-menu')[0];
let sandwichMenuClose = document.getElementsByClassName('fa-times')[0];
let nav = document.getElementsByClassName('navbar__nav')[0];
sandwichMenuOpen.onclick = () => {
    sandwichMenuOpen.classList.toggle('active');
    sandwichMenuClose.classList.toggle('active');
    nav.classList.toggle('active');
}

sandwichMenuClose.onclick = () => {
    sandwichMenuOpen.classList.toggle('active');
    sandwichMenuClose.classList.toggle('active');
    nav.classList.toggle('active');
}