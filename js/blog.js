/**
 * =============================================
 * RAMADAN GIVING - Blog Page JavaScript
 * Category filtering, search, and interactions
 * =============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    initBlogCategoryFilter();
    initBlogSearch();
    initBlogPagination();
    initDropdownNavigation();
});

/**
 * Category Filter Tabs
 */
function initBlogCategoryFilter() {
    const categoryTabs = document.querySelectorAll('.category-tab');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredArticle = document.querySelector('.featured-article');

    if (!categoryTabs.length) return;

    categoryTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Update active state
            categoryTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const category = tab.dataset.category;

            // Filter cards with animation
            blogCards.forEach(card => {
                const cardCategory = card.dataset.category;
                
                if (category === 'all' || cardCategory === category) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            // Show/hide featured based on category
            if (featuredArticle) {
                if (category === 'all' || category === 'announcement') {
                    featuredArticle.style.display = '';
                } else {
                    featuredArticle.style.display = 'none';
                }
            }
        });
    });
}

/**
 * Blog Search Functionality
 */
function initBlogSearch() {
    const searchInput = document.getElementById('blogSearch');
    const blogCards = document.querySelectorAll('.blog-card');
    const featuredArticle = document.querySelector('.featured-article');

    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        
        searchTimeout = setTimeout(() => {
            const query = e.target.value.toLowerCase().trim();

            blogCards.forEach(card => {
                const title = card.querySelector('.blog-card-title')?.textContent.toLowerCase() || '';
                const category = card.querySelector('.blog-card-category')?.textContent.toLowerCase() || '';
                const author = card.querySelector('.blog-card-author')?.textContent.toLowerCase() || '';

                if (query === '' || title.includes(query) || category.includes(query) || author.includes(query)) {
                    card.style.display = '';
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.style.display = 'none';
                }
            });

            // Handle featured article
            if (featuredArticle) {
                const featuredTitle = featuredArticle.querySelector('.featured-title')?.textContent.toLowerCase() || '';
                if (query === '' || featuredTitle.includes(query)) {
                    featuredArticle.style.display = '';
                } else {
                    featuredArticle.style.display = 'none';
                }
            }
        }, 300);
    });

    // Clear search on escape
    searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            searchInput.value = '';
            searchInput.dispatchEvent(new Event('input'));
        }
    });
}

/**
 * Pagination (placeholder for future implementation)
 */
function initBlogPagination() {
    const paginationBtns = document.querySelectorAll('.pagination-num');
    const prevBtn = document.querySelector('.pagination-btn.prev');
    const nextBtn = document.querySelector('.pagination-btn.next');

    if (!paginationBtns.length) return;

    let currentPage = 1;
    const totalPages = paginationBtns.length;

    function updatePagination() {
        paginationBtns.forEach((btn, index) => {
            btn.classList.toggle('active', index + 1 === currentPage);
        });

        if (prevBtn) prevBtn.disabled = currentPage === 1;
        if (nextBtn) nextBtn.disabled = currentPage === totalPages;
    }

    paginationBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            currentPage = index + 1;
            updatePagination();
            // Scroll to top of blog grid
            document.querySelector('.blog-grid-section')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    prevBtn?.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            updatePagination();
        }
    });

    nextBtn?.addEventListener('click', () => {
        if (currentPage < totalPages) {
            currentPage++;
            updatePagination();
        }
    });
}

/**
 * Dropdown Navigation for Blog Page
 */
function initDropdownNavigation() {
    const dropdowns = document.querySelectorAll('.nav-dropdown');

    dropdowns.forEach(dropdown => {
        const trigger = dropdown.querySelector('.dropdown-trigger');
        const menu = dropdown.querySelector('.dropdown-menu');

        if (!trigger || !menu) return;

        // Desktop: hover behavior
        dropdown.addEventListener('mouseenter', () => {
            if (window.innerWidth > 768) {
                menu.classList.add('show');
                trigger.classList.add('active');
            }
        });

        dropdown.addEventListener('mouseleave', () => {
            if (window.innerWidth > 768) {
                menu.classList.remove('show');
                trigger.classList.remove('active');
            }
        });

        // Mobile: click behavior
        trigger.addEventListener('click', (e) => {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                menu.classList.toggle('show');
                trigger.classList.toggle('active');

                // Close other dropdowns
                dropdowns.forEach(other => {
                    if (other !== dropdown) {
                        other.querySelector('.dropdown-menu')?.classList.remove('show');
                        other.querySelector('.dropdown-trigger')?.classList.remove('active');
                    }
                });
            }
        });
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.nav-dropdown')) {
            dropdowns.forEach(dropdown => {
                dropdown.querySelector('.dropdown-menu')?.classList.remove('show');
                dropdown.querySelector('.dropdown-trigger')?.classList.remove('active');
            });
        }
    });
}

/**
 * Animation keyframes injection
 */
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);

