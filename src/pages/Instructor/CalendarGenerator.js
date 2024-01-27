import React, { useEffect } from "react";





const ExamCalendar = () => {
  useEffect(() => {
    generateCalendar();
  }, []); // Run the function once when the component mounts

  function generateCalendar() {
    const today = new Date();
    const currentYear = today.getFullYear();
    const currentMonth = today.getMonth();
    const currentDate = today.getDate();

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1).getDay();

    const calendarContainer = document.getElementById('calendar-container');

    let calendarHTML = '<table style="width: 100%; font-size: 1.3em; border-collapse: collapse;" className="calendar1">';
    calendarHTML += `<caption style="font-size: 1.5em; font-weight: bold; text-align: center; margin-bottom: 10px;">${getMonthName(currentMonth)} ${currentYear}</caption>`;
    calendarHTML += '<tr><th style="padding: 10px; border: 1px solid #000;">Sun</th><th style="padding: 10px; border: 1px solid #000;">Mon</th><th style="padding: 10px; border: 1px solid #000;">Tue</th><th style="padding: 10px; border: 1px solid #000;">Wed</th><th style="padding: 10px; border: 1px solid #000;">Thu</th><th style="padding: 10px; border: 1px solid #000;">Fri</th><th style="padding: 10px; border: 1px solid #000;">Sat</th></tr>';

    let dayCounter = 1;
    let rowCount = Math.ceil((daysInMonth + firstDayOfMonth) / 7);

    for (let i = 0; i < rowCount; i++) {
      calendarHTML += '<tr>';

      for (let j = 0; j < 7; j++) {
        const dayInMonth = dayCounter - firstDayOfMonth + 1;

        if (dayInMonth > 0 && dayInMonth <= daysInMonth) {
          const isToday = (currentDate === dayInMonth && currentMonth === today.getMonth() && currentYear === today.getFullYear());
          const classList = isToday ? 'todayCalendar' : '';

          calendarHTML += `<td style="text-align: center; padding: 10px; background-color: 
  ${isToday ? '#4CAF50' : 'transparent'}; ${isToday ? 'border-radius: 1%; color: white;' : 'color: black;'} 
  border: 1px solid #000;" className="${classList}">${dayInMonth}</td>`;

        } else {
          calendarHTML += '<td style="padding: 10px; border: 1px solid #000;"></td>';
        }

        dayCounter++;
      }

      calendarHTML += '</tr>';
    }

    calendarHTML += '</table>';
    if (calendarContainer) {
      calendarContainer.innerHTML = calendarHTML;
    }
  }

  function getMonthName(month) {
    const monthNames = [
      "JAN", "FEB", "MAR", "APR", "MAY", "JUN",
      "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
    ];

    return monthNames[month];
  }

  return (
    <div>
      <div
        id="calendar-container"
        style={{
          width: "100%",
          textAlign: "center",
          paddingTop: "2%",
          padding: "10px",
          background: "#f2f2f2",
        }}
      ></div>

      <div
        style={{
          display: "flex",
          justifyContent: "right",
          textAlign: "center",
        }}
      >
        <div style={{ marginRight: "20px" }}>
          {/* LegendTable content */}
          <table
            style={{
              fontSize: "16px",
              borderCollapse: "collapse",
              border: "2px solid black",
            }}
          >
            <tbody>
              <tr>
                <td
                  style={{
                    backgroundColor: "#4CAF50",
                    padding: "0px 40px 0px 40px",
                    marginRight: "20px",
                    border: "1px solid black",
                  }}
                ></td>
                <td
                  style={{
                    padding: "15px",
                    marginRight: "10px",
                    border: "1px solid black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Today
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: "#FFA500",
                    padding: "0px 40px 0px 40px",
                    marginRight: "0px",
                    border: "1px solid black",
                  }}
                ></td>
                <td
                  style={{
                    padding: "15px",
                    marginRight: "10px",
                    border: "1px solid black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Exam Today
                </td>
              </tr>
              <tr>
                <td
                  style={{
                    backgroundColor: "red",
                    padding: "0px 40px 0px 40px",
                    marginRight: "10px",
                    border: "1px solid black",
                  }}
                ></td>
                <td
                  style={{
                    padding: "10px",
                    marginRight: "10px",
                    border: "1px solid black",
                    fontSize: "18px",
                    fontWeight: "bold",
                  }}
                >
                  Scheduled Exam

                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;
