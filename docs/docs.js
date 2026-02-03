// Sidebar navigation
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scroll for sidebar links
    const sidebarLinks = document.querySelectorAll('.sidebar-links a');
    
    sidebarLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all links
            sidebarLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Get target section
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
            
            // Close sidebar on mobile
            if (window.innerWidth <= 1024) {
                document.getElementById('sidebar').classList.remove('active');
            }
        });
    });

    // Highlight current section on scroll
    const sections = document.querySelectorAll('.docs-section');
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '-100px 0px -66%'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                sidebarLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));

    // Search functionality (basic filtering)
    const searchInput = document.querySelector('.search-box input');
    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();
            
            if (searchTerm.length > 0) {
                // Simple search through sidebar links
                sidebarLinks.forEach(link => {
                    const text = link.textContent.toLowerCase();
                    const parent = link.closest('li');
                    
                    if (text.includes(searchTerm)) {
                        parent.style.display = '';
                    } else {
                        parent.style.display = 'none';
                    }
                });
            } else {
                // Show all links when search is cleared
                sidebarLinks.forEach(link => {
                    link.closest('li').style.display = '';
                });
            }
        });

        // Keyboard shortcut (Ctrl+K)
        document.addEventListener('keydown', (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
        });
    }
});

// Toggle sidebar on mobile
function toggleSidebar() {
    const sidebar = document.getElementById('sidebar');
    sidebar.classList.toggle('active');
}

// Close sidebar when clicking outside on mobile
document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
        const sidebar = document.getElementById('sidebar');
        const toggle = document.querySelector('.mobile-menu-toggle');
        
        if (!sidebar.contains(e.target) && !toggle.contains(e.target)) {
            sidebar.classList.remove('active');
        }
    }
});
