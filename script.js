// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        const headerOffset = 80; // Account for fixed header
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
        });
    });
});

// FAQ Accordion functionality
document.querySelectorAll('#faq button').forEach(button => {
    button.addEventListener('click', () => {
        const content = button.nextElementSibling;
        const isOpen = content.classList.contains('hidden');
        
        // Close all other accordion items
        document.querySelectorAll('#faq button').forEach(otherButton => {
            if (otherButton !== button) {
                otherButton.nextElementSibling.classList.add('hidden');
                otherButton.querySelector('i').classList.remove('fa-chevron-up');
                otherButton.querySelector('i').classList.add('fa-chevron-down');
            }
        });

        // Toggle current item
        content.classList.toggle('hidden');
        const icon = button.querySelector('i');
        if (isOpen) {
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        } else {
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        }
    });
});

// Intersection Observer for fade-in animations
const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            entry.target.classList.remove('opacity-0', 'translate-y-4');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Add fade-in animation to sections
document.querySelectorAll('section').forEach(section => {
    section.style.opacity = '1'; // Ensure sections are visible by default
    section.style.transform = 'translateY(0)'; // Reset transform
    observer.observe(section);
});

// Mobile menu toggle (if needed)
const mobileMenuButton = document.createElement('button');
mobileMenuButton.className = 'md:hidden p-2';
mobileMenuButton.innerHTML = '<i class="fas fa-bars"></i>';
document.querySelector('nav .flex-shrink-0').appendChild(mobileMenuButton);

const mobileMenu = document.createElement('div');
mobileMenu.className = 'md:hidden fixed inset-0 bg-white z-40 transform translate-x-full transition-transform duration-300 ease-in-out';
mobileMenu.innerHTML = `
    <div class="p-4">
        <button class="absolute top-4 right-4 p-2">
            <i class="fas fa-times"></i>
        </button>
        <div class="mt-8 space-y-4">
            <a href="#how-it-works" class="block text-gray-700 hover:text-gray-900">How It Works</a>
            <a href="#course" class="block text-gray-700 hover:text-gray-900">Course</a>
            <a href="#testimonials" class="block text-gray-700 hover:text-gray-900">Testimonials</a>
            <a href="#faq" class="block text-gray-700 hover:text-gray-900">FAQ</a>
            <a href="#cta" class="block bg-blue-600 text-white px-4 py-2 rounded-lg">Get Started</a>
        </div>
    </div>
`;
document.body.appendChild(mobileMenu);

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.remove('translate-x-full');
});

mobileMenu.querySelector('button').addEventListener('click', () => {
    mobileMenu.classList.add('translate-x-full');
}); 