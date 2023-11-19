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

function generateCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarContainer = document.getElementById('calendar-container');

    let calendarHTML = '<table class="calendar1">';
    calendarHTML += '<tr><th>Sun</th><th>Mon</th><th>Tue</th><th>Wed</th><th>Thu</th><th>Fri</th><th>Sat</th></tr>';
    
    let dayCounter = 1;
    let rowCount = Math.ceil((daysInMonth + firstDayOfMonth) / 7); // Calculate the number of rows needed

    for (let i = 0; i < rowCount; i++) {
        calendarHTML += '<tr>';

        for (let j = 0; j < 7; j++) {
            const dayInMonth = dayCounter - firstDayOfMonth + 1;

            if (dayInMonth > 0 && dayInMonth <= daysInMonth) {
                const isToday = (currentDate === dayInMonth && currentMonth === today.getMonth() && currentYear === today.getFullYear());
                const classList = isToday ? 'todayCalendar' : '';

                calendarHTML += `<td class="${classList}">${dayInMonth}</td>`;
            } else {
                calendarHTML += '<td></td>';
            }

            dayCounter++;
        }

        calendarHTML += '</tr>';
    }

    calendarHTML += '</table>';
    calendarContainer.innerHTML = calendarHTML;
}

generateCalendar();