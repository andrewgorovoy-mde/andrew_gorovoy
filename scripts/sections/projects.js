/**
 * Projects Section
 * 
 * Handles the projects section's content and Rough.js drawings.
 * Edit the projects array below to add/remove/modify projects.
 */

class ProjectsSection {
    constructor() {
        this.container = document.getElementById('projects-container');
        
        // Projects data - Edit this array to customize your projects
        this.projects = [
            {
                title: 'Project One',
                description: 'A brief description of your first project. Explain what it does and why it\'s interesting.',
                technologies: ['JavaScript', 'HTML', 'CSS'],
                link: 'https://github.com/yourusername/project-one'
            },
            {
                title: 'Project Two',
                description: 'A brief description of your second project. Highlight key features and technologies used.',
                technologies: ['React', 'Node.js', 'MongoDB'],
                link: 'https://github.com/yourusername/project-two'
            },
            {
                title: 'Project Three',
                description: 'A brief description of your third project. Showcase your skills and creativity.',
                technologies: ['Python', 'Django', 'PostgreSQL'],
                link: 'https://github.com/yourusername/project-three'
            }
        ];
    }

    /**
     * Initialize the projects section
     * Call this after DOM is loaded
     */
    init() {
        if (!this.container) return;
        
        this.renderProjects();
    }

    /**
     * Render all projects as cards
     */
    renderProjects() {
        this.container.innerHTML = '';
        
        this.projects.forEach((project, index) => {
            const card = this.createProjectCard(project, index);
            this.container.appendChild(card);
        });
    }

    /**
     * Create a project card element
     * @param {object} project - Project data object
     * @param {number} index - Index of the project
     * @returns {HTMLElement} Project card element
     */
    createProjectCard(project, index) {
        const card = document.createElement('div');
        card.className = 'project-card';
        card.setAttribute('data-project-index', index);
        
        // Create canvas for card decoration
        const canvas = document.createElement('canvas');
        canvas.className = 'project-card-canvas';
        canvas.style.position = 'absolute';
        canvas.style.top = '0';
        canvas.style.left = '0';
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        canvas.style.pointerEvents = 'none';
        canvas.style.opacity = '0.1';
        
        // Set canvas size
        setTimeout(() => {
            const rect = card.getBoundingClientRect();
            canvas.width = rect.width;
            canvas.height = rect.height;
            this.drawCardDecoration(canvas, index);
        }, 100);
        
        // Card content
        const title = document.createElement('h3');
        title.className = 'project-card-title';
        title.textContent = project.title;
        
        const description = document.createElement('p');
        description.className = 'project-card-description';
        description.textContent = project.description;
        
        const technologies = document.createElement('div');
        technologies.className = 'project-card-technologies';
        project.technologies.forEach(tech => {
            const tag = document.createElement('span');
            tag.className = 'technology-tag';
            tag.textContent = tech;
            technologies.appendChild(tag);
        });
        
        const link = document.createElement('a');
        link.className = 'project-card-link btn';
        link.href = project.link || '#';
        link.target = project.link ? '_blank' : '_self';
        link.textContent = project.link ? 'View Project' : 'Coming Soon';
        link.rel = project.link ? 'noopener noreferrer' : '';
        
        // Assemble card
        card.appendChild(canvas);
        card.appendChild(title);
        card.appendChild(description);
        card.appendChild(technologies);
        card.appendChild(link);
        
        return card;
    }

    /**
     * Draw decoration on project card canvas
     * @param {HTMLCanvasElement} canvas - Canvas element
     * @param {number} index - Project index for variation
     */
    drawCardDecoration(canvas, index) {
        const drawer = new RoughDrawer(canvas);
        drawer.resize();
        
        const width = canvas.width;
        const height = canvas.height;
        
        // Draw different decorations based on index
        const decorationOptions = {
            fill: 'none',
            strokeWidth: 1,
            roughness: 1.5
        };
        
        switch (index % 3) {
            case 0:
                // Circle decoration
                drawer.drawCircle(
                    width - 20,
                    20,
                    30,
                    decorationOptions
                );
                break;
            case 1:
                // Rectangle decoration
                drawer.drawRectangle(
                    width - 40,
                    10,
                    30,
                    30,
                    decorationOptions
                );
                break;
            case 2:
                // Ellipse decoration
                drawer.drawEllipse(
                    width - 25,
                    15,
                    40,
                    25,
                    decorationOptions
                );
                break;
        }
    }
}

// Initialize when DOM is loaded
let projectsSection;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        projectsSection = new ProjectsSection();
        projectsSection.init();
    });
} else {
    projectsSection = new ProjectsSection();
    projectsSection.init();
}

