/**
 * Design Section
 * 
 * Handles the design projects grid with Rough.js rectangles.
 * Each project card is clickable and navigates to a detail page.
 */

class DesignSection {
    constructor() {
        this.container = document.getElementById('design-projects-container');
        this.projects = [];
        
        // Placeholder projects data
        this.projectsData = [
            {
                id: 'project-1',
                title: 'All In - Accessible Board Game System for the Visually Impaired',
                image: 'assets/design_images/all_in_cover.jpg',
                description: 'This is a placeholder description for Project One. Add your project details here.'
            },
            {
                id: 'project-2',
                title: 'Project Two',
                image: 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Project+Two',
                description: 'This is a placeholder description for Project Two. Add your project details here.'
            },
            {
                id: 'project-3',
                title: 'Project Three',
                image: 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Project+Three',
                description: 'This is a placeholder description for Project Three. Add your project details here.'
            },
            {
                id: 'project-4',
                title: 'Project Four',
                image: 'https://via.placeholder.com/600x400/000000/FFFFFF?text=Project+Four',
                description: 'This is a placeholder description for Project Four. Add your project details here.'
            }
        ];
        
        this.init();
    }

    /**
     * Initialize the design section
     */
    init() {
        if (!this.container) return;
        
        this.renderProjects();
        
        // Redraw rectangles on window resize
        window.addEventListener('resize', () => {
            this.redrawAllRectangles();
        });
    }

    /**
     * Render all project cards
     */
    renderProjects() {
        this.container.innerHTML = '';
        
        this.projectsData.forEach((projectData, index) => {
            const card = this.createProjectCard(projectData, index);
            this.container.appendChild(card);
        });
    }

    /**
     * Create a project card element
     * @param {object} projectData - Project data object
     * @param {number} index - Index of the project
     * @returns {HTMLElement} Project card element
     */
    createProjectCard(projectData, index) {
        const card = document.createElement('div');
        card.className = 'design-project-card';
        card.setAttribute('data-project-id', projectData.id);
        
        // Create canvas for Rough.js rectangle
        const canvas = document.createElement('canvas');
        canvas.className = 'design-project-canvas';
        
        // Card content
        const content = document.createElement('div');
        content.className = 'design-project-content';
        
        const image = document.createElement('img');
        image.className = 'design-project-image';
        image.src = projectData.image;
        image.alt = projectData.title;
        
        const title = document.createElement('h3');
        title.className = 'design-project-title';
        title.textContent = projectData.title;
        
        // Assemble card
        content.appendChild(image);
        content.appendChild(title);
        card.appendChild(canvas);
        card.appendChild(content);
        
        // Draw rectangle on canvas after a short delay to ensure dimensions are set
        setTimeout(() => {
            this.drawRectangle(canvas, card);
        }, 100);
        
        // Add click handler
        card.addEventListener('click', () => {
            this.openProjectDetail(projectData);
        });
        
        return card;
    }

    /**
     * Draw Rough.js rectangle on canvas
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {HTMLElement} card - Card element
     */
    drawRectangle(canvas, card) {
        const rect = card.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const ctx = canvas.getContext('2d');
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const rc = rough.canvas(canvas);
        
        const options = {
            stroke: '#000000',
            strokeWidth: 3,
            roughness: 2,
            bowing: 2,
            fill: null
        };
        
        // Draw rectangle border with padding for visibility
        const padding = 2;
        rc.rectangle(
            padding, 
            padding, 
            canvas.width - padding * 2, 
            canvas.height - padding * 2, 
            options
        );
    }

    /**
     * Redraw all rectangles (for resize)
     */
    redrawAllRectangles() {
        const cards = this.container.querySelectorAll('.design-project-card');
        cards.forEach(card => {
            const canvas = card.querySelector('.design-project-canvas');
            if (canvas) {
                this.drawRectangle(canvas, card);
            }
        });
    }

    /**
     * Open project detail page
     * @param {object} projectData - Project data object
     */
    openProjectDetail(projectData) {
        // Update project detail page content
        const detailContent = document.getElementById('project-detail-content');
        if (!detailContent) return;
        
        detailContent.innerHTML = `
            <h1 class="project-detail-title">${projectData.title}</h1>
            <img src="${projectData.image}" alt="${projectData.title}" class="project-detail-image">
            <p class="project-detail-description">${projectData.description}</p>
        `;
        
        // Navigate to project detail page
        if (pageManager) {
            pageManager.showPage('project-detail');
        }
    }
}

// Initialize when DOM is loaded
let designSection;
function initDesignSection() {
    const designPage = document.getElementById('design');
    if (!designPage) return;
    
    designSection = new DesignSection();
    
    // Watch for when design page becomes active
    const observer = new MutationObserver(() => {
        if (designPage.classList.contains('active')) {
            setTimeout(() => {
                if (designSection) {
                    designSection.redrawAllRectangles();
                }
            }, 100);
        }
    });
    
    observer.observe(designPage, { attributes: true, attributeFilter: ['class'] });
    
    // Also initialize if already active
    if (designPage.classList.contains('active')) {
        setTimeout(() => {
            if (designSection) {
                designSection.redrawAllRectangles();
            }
        }, 100);
    }
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        initDesignSection();
    });
} else {
    initDesignSection();
}

