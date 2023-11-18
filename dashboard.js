// For displaying each sub listing on the dashboard

function showContent(contentId, event) {
    // Hide all content sections
    document.querySelectorAll('.section').forEach(function(section) {
        section.style.display = 'none';
    });

    // Show the selected content section
    document.getElementById(contentId + 'Content').style.display = 'block';
}

function toggleActiveClass(element) {
    
    // Remove "active1" class from all list items
    document.querySelectorAll('#navborder li a').forEach(function(link) {
        link.classList.remove('active1');
    });
    // alert("test");
    // Add "active1" class to the clicked link
    element.classList.add('active1');
}