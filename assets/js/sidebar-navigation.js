document.addEventListener('DOMContentLoaded', function() {
    // Create left sidebar for main document structure
    createLeftSidebar();
    
    // Create right sidebar for current page's second-level headings
    createRightSidebar();
    
    // Add event listeners for sidebar toggles on mobile
    setupMobileToggles();
});

function createLeftSidebar() {
    // Create the left sidebar container if it doesn't exist
    let leftSidebar = document.querySelector('.main-nav');
    if (!leftSidebar) {
        leftSidebar = document.createElement('div');
        leftSidebar.className = 'main-nav';
        document.querySelector('.wrapper').prepend(leftSidebar);
    }
    
    // Add title to the sidebar
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.textContent = 'PicoScenes Documentation';
    leftSidebar.appendChild(sidebarTitle);
    
    // Create navigation list
    const navList = document.createElement('ul');
    navList.className = 'doc-structure-nav';
    leftSidebar.appendChild(navList);
    
    // Always extract the main modules from the Table of Contents section
    // regardless of whether we're on the index page or not
    extractMainModulesFromCurrentPage(navList);
    
    // If we're not on the index page, also show a link back to index
    const isIndexPage = window.location.pathname === '/' || 
                       window.location.pathname.endsWith('index.html') || 
                       window.location.pathname.endsWith('index.md');
    
    if (!isIndexPage) {
        // Add a separator
        const separator = document.createElement('li');
        separator.className = 'nav-separator';
        navList.appendChild(separator);
        
        // Add back to home link
        const homeItem = document.createElement('li');
        const homeLink = document.createElement('a');
        homeLink.href = '/';
        homeLink.textContent = '← Back to Main Page';
        homeLink.className = 'back-to-home';
        homeItem.appendChild(homeLink);
        navList.appendChild(homeItem);
        
        // Extract the current page's main headings
        extractCurrentPageMainHeadings(navList);
    }
}
}

function extractMainHeadingsFromHTML(html, navList) {
    // Create a temporary element to parse the HTML
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = html;
    
    // Find all h1 elements in the parsed HTML
    const h1Elements = tempDiv.querySelectorAll('h1');
    
    h1Elements.forEach(heading => {
        // Skip the title heading (PicoScenes: Enabling Modern Wi-Fi ISAC Research!)
        if (heading.textContent.includes('PicoScenes: Enabling Modern Wi-Fi ISAC Research')) {
            return;
        }
        
        // Create list item for each main heading
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        
        // Get the href from the heading's id or create one
        const headingId = heading.id || heading.textContent.toLowerCase().replace(/[^\w]+/g, '-');
        
        // Determine the correct link
        let href = '#' + headingId;
        
        // If the heading contains a link, use that link instead
        const headingLink = heading.querySelector('a');
        if (headingLink) {
            href = headingLink.getAttribute('href');
        }
        
        // If the heading text contains a number (like "1. Gallery"), extract it
        const headingText = heading.textContent.trim();
        
        link.href = href;
        link.textContent = headingText;
        listItem.appendChild(link);
        navList.appendChild(listItem);
    });
}

function extractMainModulesFromCurrentPage(navList) {
    // Look for the table of contents section in the current page
    const content = document.querySelector('section');
    if (!content) return;
    
    // Find the "Table of Contents" heading
    let tocHeading = null;
    const headings = content.querySelectorAll('h2');
    for (const heading of headings) {
        if (heading.textContent.includes('Table of Contents')) {
            tocHeading = heading;
            break;
        }
    }
    
    if (tocHeading) {
        // Get the list that follows the TOC heading
        let tocList = tocHeading.nextElementSibling;
        while (tocList && tocList.tagName !== 'UL') {
            tocList = tocList.nextElementSibling;
        }
        
        if (tocList) {
            // Extract main modules (level 1) from the TOC
            const mainItems = tocList.querySelectorAll('li > a');
            for (const item of mainItems) {
                // Check if this is a main module (not indented/sub-item)
                if (!item.closest('li').parentElement.closest('li')) {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = item.href;
                    link.textContent = item.textContent;
                    listItem.appendChild(link);
                    navList.appendChild(listItem);
                }
            }
        }
    } else {
        // If no TOC heading found, try to extract from the content directly
        // Find links that match the pattern of "[number]. [Title]" like "1. Gallery"
        const links = content.querySelectorAll('a');
        const moduleLinks = Array.from(links).filter(link => {
            return /^\d+\.\s+[A-Za-z]+/.test(link.textContent);
        });
        
        moduleLinks.forEach(link => {
            const listItem = document.createElement('li');
            const newLink = document.createElement('a');
            newLink.href = link.href;
            newLink.textContent = link.textContent;
            listItem.appendChild(newLink);
            navList.appendChild(listItem);
        });
    }
}

function extractCurrentPageMainHeadings(navList) {
    // Look for the content in the current page
    const content = document.querySelector('section');
    if (!content) return;
    
    // Find all h1 and h2 elements in the content
    const headings = content.querySelectorAll('h1, h2');
    
    // Add each heading to the navigation
    headings.forEach((heading, index) => {
        // Skip the title heading if it's "PicoScenes: Enabling Modern Wi-Fi ISAC Research!"
        if (heading.textContent.includes('PicoScenes: Enabling Modern Wi-Fi ISAC Research')) {
            return;
        }
        
        // Only include h1 and direct h2 (not nested under other elements)
        if (heading.tagName === 'H1' || 
            (heading.tagName === 'H2' && !heading.textContent.includes('Table of Contents'))) {
            const listItem = document.createElement('li');
            const link = document.createElement('a');
            
            // Get the href from the heading's id or create one
            const headingId = heading.id || 'heading-' + index;
            heading.id = headingId; // Ensure the heading has an ID for linking
            link.href = '#' + headingId;
            link.textContent = heading.textContent;
            
            // Add a class to differentiate h1 and h2
            if (heading.tagName === 'H2') {
                listItem.className = 'sub-heading';
            }
            
            listItem.appendChild(link);
            navList.appendChild(listItem);
        }
    });
}

function populateMainHeadings(text, navList) {
    // Extract main headings (level 1) from index.md content
    const mainHeadings = text.match(/^# (.+)$/gm);
    
    if (mainHeadings) {
        mainHeadings.forEach(heading => {
            // Skip the title heading
            if (heading.includes('PicoScenes: Enabling Modern Wi-Fi ISAC Research')) {
                return;
            }
            
            const title = heading.replace('# ', '');
            const slug = title.toLowerCase().replace(/[^\w]+/g, '-');
            
            const listItem = document.createElement('li');
            const anchor = document.createElement('a');
            
            // If the title contains a number and a filename (like "1. Gallery"), extract it
            const match = title.match(/(\d+\. [^\(]+)(\(([^\)]+)\))?/);
            
            if (match) {
                const displayTitle = match[1].trim();
                const fileName = match[3] ? match[3].trim() : null;
                
                anchor.textContent = displayTitle;
                
                // If we have a filename, use it for the href
                if (fileName) {
                    anchor.href = '/' + fileName;
                } else {
                    // Otherwise use the slug
                    anchor.href = '#' + slug;
                }
            } else {
                anchor.href = '#' + slug;
                anchor.textContent = title;
            }
            
            listItem.appendChild(anchor);
            navList.appendChild(listItem);
        });
    }
    
    // If no main headings were found, try to extract from Table of Contents
    if (navList.children.length <= 1) { // Only the title is present
        const tocSection = text.match(/## Table of Contents[\s\S]*?(?=##|$)/);
        if (tocSection) {
            const mainHeadingLinks = tocSection[0].match(/\[([^\]]+)\]\(([^\)]+)\)/g);
            if (mainHeadingLinks) {
                mainHeadingLinks.forEach(heading => {
                    const title = heading.match(/\[([^\]]+)\]/);
                    const link = heading.match(/\(([^\)]+)\)/);
                    
                    if (title && link) {
                        const listItem = document.createElement('li');
                        const anchor = document.createElement('a');
                        anchor.href = link[1];
                        anchor.textContent = title[1];
                        listItem.appendChild(anchor);
                        navList.appendChild(listItem);
                    }
                });
            }
        }
    }
}

function createRightSidebar() {
    // Create the right sidebar container if it doesn't exist
    let rightSidebar = document.querySelector('.toc-container');
    if (!rightSidebar) {
        rightSidebar = document.createElement('div');
        rightSidebar.className = 'toc-container';
        document.querySelector('section').appendChild(rightSidebar);
    }
    
    // Create TOC list with a title
    const tocTitle = document.createElement('h2');
    tocTitle.textContent = 'Table of Contents';
    rightSidebar.appendChild(tocTitle);

    const tocList = document.createElement('ul');
    tocList.className = 'page-toc';
    rightSidebar.appendChild(tocList);
    
    // Find all headings in the current page
    const content = document.querySelector('section');
    const headings = content.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Add each heading to the TOC
    headings.forEach((heading, index) => {
        // Skip the title heading if it's "PicoScenes: Enabling Modern Wi-Fi ISAC Research!"
        if (heading.textContent.includes('PicoScenes: Enabling Modern Wi-Fi ISAC Research')) {
            return;
        }

        // Skip the Table of Contents heading itself
        if (heading.textContent === 'Table of Contents') {
            return;
        }
        
        // Add an ID to the heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'section-' + index;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;

        // Add indentation class based on heading level
        listItem.className = `toc-level-${heading.tagName.toLowerCase()}`;
        
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
}

function setupMobileToggles() {
    // Create toggle buttons for mobile view with only icons
    const leftToggle = document.createElement('button');
    leftToggle.className = 'sidebar-toggle left-toggle';
    leftToggle.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('show-sidebar');
    });
    
    const rightToggle = document.createElement('button');
    rightToggle.className = 'sidebar-toggle right-toggle';
    rightToggle.addEventListener('click', function() {
        document.querySelector('.toc-container').classList.toggle('show-sidebar');
    });
    
    // Add toggles to the page in mobile view
    const header = document.querySelector('header');
    if (header) {
        header.prepend(leftToggle);
        header.appendChild(rightToggle);
    }
}
