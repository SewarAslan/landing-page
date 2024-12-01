

/* Global Variables */
// i can initalize sections with document.querySelectorAll as a global variable  here but section 5 won't appear!
const navBar = document.getElementById('navbar__list');
let scrollTimeout;

/* Helper Functions */

// Check if a section is visible in the viewport
const checkVisibility = (section) => {
    const rect = section.getBoundingClientRect();
    return rect.top < window.innerHeight / 2 && rect.bottom > window.innerHeight / 2;
};

// Highlight the active section and its navigation link
const markActive = () => {
    sections.forEach((section) => {
        const navLink = document.querySelector(`a[href="#${section.id}"]`);
        if (checkVisibility(section)) {
            section.classList.add('active');
            navLink.classList.add('active');
        } else {
            section.classList.remove('active');
            navLink.classList.remove('active');
        }
    });
};

// Create a new section and add it to the page
const addNewSection = (id, navText, content) => {
    const newSection = document.createElement('section');
    newSection.id = id;
    newSection.dataset.nav = navText;
    newSection.innerHTML = `
        <h2>${navText}</h2>
        <p>${content}</p>
    `;
    document.querySelector('main').appendChild(newSection);
};

/* Main Code */

// Add a new section to the page
addNewSection('section5', 'Section 5', 'This is the content for Section 5.');

const sections = document.querySelectorAll('section');
// Build the navigation menu dynamically
sections.forEach((section) => {
    const listItem = document.createElement('li');
    const anchor = document.createElement('a'); 
    anchor.className = 'menu__link'; 
    anchor.href = `#${section.id}`;
    anchor.textContent = section.dataset.nav; 
    listItem.appendChild(anchor); 
    navBar.appendChild(listItem); 
});

// Smooth scroll to sections on navigation click
navBar.addEventListener('click', (event) => {
    event.preventDefault();
    const target = event.target.getAttribute('href');
    if (target) {
        const section = document.querySelector(target);
        section.scrollIntoView({ behavior: 'smooth' });
    }
});

// Create and style a "scroll to top" button
const createScrollButton = document.createElement('button');
createScrollButton.id = 'scrollTop';
createScrollButton.textContent = 'Top';
createScrollButton.style.cssText = `
    position: fixed;
    bottom: 20px;
    right: 20px;
    padding: 10px 15px;
    display: none;
    cursor: pointer;
    border-radius: 5px;
`;
document.body.appendChild(createScrollButton);

// Show or hide the "scroll to top" button
window.addEventListener('scroll', () => {
    if (window.scrollY > window.innerHeight) {
        createScrollButton.style.display = 'block';
    } else {
        createScrollButton.style.display = 'none';
    }
});

// Scroll to the top when the button is clicked
createScrollButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Hide the navigation bar when not scrolling
window.addEventListener('scroll', () => {
    document.querySelector('.page__header').classList.remove('navbar__hidden');
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
        document.querySelector('.page__header').classList.add('navbar__hidden');
    }, 3000);
});

// Handle collapsible section headers
const headers = document.querySelectorAll('.section__header');
headers.forEach(header => {
    header.addEventListener('click', () => {
        // Get the content directly following the header
        const content = header.nextElementSibling; 
        
        // Ensure the content exists and has the class 'section__content'
        if (content && content.classList.contains('section__content')) {
            content.classList.toggle('collapsed'); // Toggle the 'collapsed' class
        } 
    });
});

// Highlight the active section when scrolling
window.addEventListener('scroll', markActive);

// Initialize the script
document.addEventListener('DOMContentLoaded', () => {
    markActive();
});
