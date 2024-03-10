import React, { useEffect } from "react";
import { useState } from 'react';
import { db } from "../../backend/firebase/firebase";
import {
  Timestamp,
  addDoc,
  collection,
  getDocs,
  getDoc,
  doc,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";


const buttonStyle = {
  background: "#009ADF",
  color: "#FFFFFF",
  border: "none",
  padding: "10px 20px",
  borderRadius: "5px",
  cursor: "pointer",
  margin: "0 5px",
  outline: "none",
  boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
  transition: "background 0.3s ease",
  fontFamily: "Inter, sans-serif"
};

const ExamCalendar = () => {
  const [date, setDate] = useState(new Date());

  const daysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  const getMonthData = () => {
    const month = date.getMonth();
    const year = date.getFullYear();
    const firstDay = new Date(year, month, 1).getDay();
    const days = daysInMonth(month, year);
    const monthData = [];

    let day = 1;
    for (let i = 0; i < 6; i++) {
      const week = [];
      for (let j = 0; j < 7; j++) {
        if ((i === 0 && j < firstDay) || day > days) {
          week.push(null);
        } else {
          week.push(day);
          day++;
        }
      }
      monthData.push(week);
      if (day > days) break;
    }
    return monthData;
  };

  const prevMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() - 1));
  };

  const nextMonth = () => {
    setDate(new Date(date.getFullYear(), date.getMonth() + 1));
  };

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  const monthData = getMonthData();
  const today = new Date();

  return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", textAlign: "center", paddingTop: "2%", padding: "10px", border: "1px solid #ccc", borderRadius: "5px", margin: "20px 0", boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <button onClick={prevMonth} style={buttonStyle}>Prev</button>
          <span style={{ fontSize: "35px", fontWeight: "bold", margin: "0 10px" }}>
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </span>
          <button onClick={nextMonth} style={buttonStyle}>Next</button>
        </div>
        <table style={{ width: "100%" }}>
          <thead>
            <tr>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Sun</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Mon</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Tue</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Wed</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Thu</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Fri</th>
              <th style={{ border: "1px solid #ccc", fontSize: "27px", padding: "10px" }}>Sat</th>
            </tr>
          </thead>
          <tbody>
            {monthData.map((week, index) => (
              <tr key={index} style={{ border: "1px solid #ccc" }}>
                {week.map((day, index) => (
                  <td
                    key={index}
                    style={{
                      border: "1px solid #ccc",
                      fontSize: "25px",
                      padding: "10px",
                      backgroundColor: (day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) ? "lightgreen" : (index === 0 || index === 6) ? "#e0e0e0" : "inherit", // Light green for today's date, grey for weekends
                      color: (index === 0 || index === 6) ? "#666" : "inherit", // Change text color for weekends
                      fontWeight: (day === today.getDate() && date.getMonth() === today.getMonth() && date.getFullYear() === today.getFullYear()) ? "bold" : "normal" // Bold font for today's date
                    }}
                  >
                    {day}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ width: "100%", textAlign: "center", paddingBottom: "20px" }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "lightgreen", marginRight: "5px" }}></span>
            <span style={{ color: "black" }}>Today</span>
          </div>
          <div style={{ display: "inline-block", marginRight: "20px" }}>
            <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "orange", marginRight: "5px" }}></span>
            <span style={{ color: "black" }}>Exam Days</span>
          </div>
          <div style={{ display: "inline-block" }}>
            <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "red", marginRight: "5px" }}></span>
            <span style={{ color: "black" }}>Exam Today</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamCalendar;
