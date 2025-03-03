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
    sidebarTitle.textContent = 'Document Structure';
    leftSidebar.appendChild(sidebarTitle);
    
    // Create navigation list
    const navList = document.createElement('ul');
    navList.className = 'doc-structure-nav';
    leftSidebar.appendChild(navList);
    
    // Fetch the index.md content to extract main headings
    fetch('/index.md')
        .then(response => {
            if (!response.ok) {
                // If direct fetch fails, try to extract from the current page if we're on index
                if (window.location.pathname === '/' || window.location.pathname.includes('index')) {
                    extractMainHeadingsFromCurrentPage();
                }
                return;
            }
            return response.text();
        })
        .then(text => {
            if (text) {
                populateMainHeadings(text, navList);
            }
        })
        .catch(error => {
            console.error('Error fetching index.md:', error);
            // Fallback: try to extract from current page if we're on index
            if (window.location.pathname === '/' || window.location.pathname.includes('index')) {
                extractMainHeadingsFromCurrentPage();
            }
        });
}

function extractMainHeadingsFromCurrentPage() {
    const navList = document.querySelector('.doc-structure-nav');
    if (!navList) return;
    
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
            // Extract main headings (level 1) from the TOC
            const mainItems = tocList.querySelectorAll('li > a');
            for (const item of mainItems) {
                const listItem = document.createElement('li');
                const link = document.createElement('a');
                link.href = item.href;
                link.textContent = item.textContent;
                listItem.appendChild(link);
                navList.appendChild(listItem);
            }
        }
    }
}

function populateMainHeadings(text, navList) {
    // Extract main headings (level 1) from index.md content
    const tocSection = text.match(/## Table of Contents[\s\S]*?(?=##|$)/);
    if (tocSection) {
        const mainHeadings = tocSection[0].match(/\[\d+\. [^\]]+\]\([^\)]+\)/g);
        if (mainHeadings) {
            mainHeadings.forEach(heading => {
                const title = heading.match(/\[(\d+\. [^\]]+)\]/);
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

function createRightSidebar() {
    // Create the right sidebar container if it doesn't exist
    let rightSidebar = document.querySelector('.toc-container');
    if (!rightSidebar) {
        rightSidebar = document.createElement('div');
        rightSidebar.className = 'toc-container';
        document.querySelector('section').appendChild(rightSidebar);
    }
    
    // Add title to the sidebar
    const sidebarTitle = document.createElement('h2');
    sidebarTitle.textContent = 'On This Page';
    rightSidebar.appendChild(sidebarTitle);
    
    // Create TOC list
    const tocList = document.createElement('ul');
    tocList.className = 'page-toc';
    rightSidebar.appendChild(tocList);
    
    // Find all h2 headings in the current page
    const content = document.querySelector('section');
    const headings = content.querySelectorAll('h2');
    
    // Add each heading to the TOC
    headings.forEach((heading, index) => {
        // Add an ID to the heading if it doesn't have one
        if (!heading.id) {
            heading.id = 'section-' + index;
        }
        
        const listItem = document.createElement('li');
        const link = document.createElement('a');
        link.href = '#' + heading.id;
        link.textContent = heading.textContent;
        listItem.appendChild(link);
        tocList.appendChild(listItem);
    });
}

function setupMobileToggles() {
    // Create toggle buttons for mobile view
    const leftToggle = document.createElement('button');
    leftToggle.className = 'sidebar-toggle left-toggle';
    leftToggle.textContent = '☰ Menu';
    leftToggle.addEventListener('click', function() {
        document.querySelector('.main-nav').classList.toggle('show-sidebar');
    });
    
    const rightToggle = document.createElement('button');
    rightToggle.className = 'sidebar-toggle right-toggle';
    rightToggle.textContent = '☰ On This Page';
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