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
import { useNavigate } from 'react-router-dom';


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
  const [examDates, setExamDates] = useState([]);
  const [examNames, setExamNames] = useState([]);
  const [examTimes, setExamTimes] = useState([]);
  
  const fetchExams = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, 'exams'));
      const dates = [];

      querySnapshot.forEach((doc) => {
        const examData = doc.data();
        const startTime = new Date(examData.startTime.seconds * 1000); // Convert Firestore Timestamp to JavaScript Date object
        dates.push(new Date(startTime.getFullYear(), startTime.getMonth(), startTime.getDate())); // Extract date portion only
        names.push(examData.name);
        times.push(startTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
      });

      setExamDates(dates);
      setExamNames(names);
      setExamTimes(times);
      console.log("Fetched exam dates:", dates);
      console.log("Fetched exam names:", names);
      console.log("Fetched exam names:", times);
    } catch (error) {
      console.error("Error fetching exams:", error);
    }
  };

  useEffect(() => {
    fetchExams();
  }, []);

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
          const currentDate = new Date(year, month, day);
          const isToday = isSameDate(currentDate, new Date());
          const isExamDay = examDates.some(examDate => isSameDate(examDate, currentDate));
          const isYesterday = isSameDate(currentDate, new Date(Date.now() - 86400000)); // 86400000 ms in a day
          const isBeforeToday = currentDate < new Date();
          const isExamBeforeToday = isBeforeToday && isExamDay && !isToday;
          const isWeekend = j === 0 || j === 6;
  
          let backgroundColor = "";
          if (isExamDay) {
            if (isToday) {
              backgroundColor = "red"; // Exam today
            } else if (isYesterday || isBeforeToday) {
              backgroundColor = "#E3E1D9"; // Exam yesterday or before today
            } else {
              backgroundColor = "#FFA447"; // Exam not today and not yesterday, but after yesterday
            }
          } else {
            if (isToday) {
              backgroundColor = "lightgreen"; // Current day with no exam
            } else {
              backgroundColor = null; // Regular day with no exam
            }
          }
  
          week.push({
            day: day,
            isToday: isToday,
            isExamDay: isExamDay,
            isYesterday: isYesterday,
            isBeforeToday: isBeforeToday,
            isExamBeforeToday: isExamBeforeToday,
            isWeekend: isWeekend,
            backgroundColor: backgroundColor
          });
          day++;
        }
      }
      monthData.push(week);
      if (day > days) break;
    }
    return monthData;
  };

  const isSameDate = (date1, date2) => {
    return date1.getDate() === date2.getDate() &&
           date1.getMonth() === date2.getMonth() &&
           date1.getFullYear() === date2.getFullYear();
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

  const navigate = useNavigate(); 

  const handleDateClick = (day) => {
    const currentDay = new Date(date.getFullYear(), date.getMonth(), day);
    const isToday = isSameDate(currentDay, new Date());

    if (isToday) {
      // Navigate to View Exams
      navigate("/Instructor/InstructorExamPage");
    } else {
      navigate("/Instructor/InstructorLibrary");
    }
  };

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
                   backgroundColor: day && (day.isToday || day.isExamDay) ? day.backgroundColor : (day && day.isWeekend) ? "#B4B4B8" : null,
                   color: (index === 0 || index === 6) ? "#666" : "inherit",
                   fontWeight: day && day.isToday ? "bold" : "normal",
                   cursor: day && (day.isToday || day.isExamDay) ? "pointer" : "default"
                 }}
                 onClick={() => day.backgroundColor && handleDateClick(day.day)}
               >
                  {day ? day.day : null}
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
          <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "#E3E1D9", marginRight: "5px" }}></span>
          <span style={{ color: "black" }}>Past Exams</span>
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "lightgreen", marginRight: "5px" }}></span>
          <span style={{ color: "black" }}>Today</span>
        </div>
        <div style={{ display: "inline-block", marginRight: "20px" }}>
          <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "#FFA447", marginRight: "5px" }}></span>
          <span style={{ color: "black" }}>Exam Days</span>
        </div>
        <div style={{ display: "inline-block" }}>
          <span style={{ display: "inline-block", width: "20px", height: "20px", backgroundColor: "red", marginRight: "5px" }}></span>
          <span style={{ color: "black" }}>Exam Today</span>
        </div>
      </div>
    </div>
      <div style={{ width: "90%", }}>
        <h2>Upcoming Exams</h2>
        <ul style={{ listStyleType: "none", padding: 0 }}>
          {examDates.map((examDate, index) => (
             <li key={index} style={{ marginBottom: "10px", fontSize: "18px" }}>
               <strong>Date:</strong> {examDate.getDate()}/{monthNames[examDate.getMonth()].substr(0, 3)}/{examDate.getFullYear().toString().substr(-2)}{" "} <span style={{ marginRight: "15px" }}></span>
              <strong>Time:</strong> <span style={{ marginRight: "5px" }}></span>{examTimes[index]}{" "} <span style={{ marginRight: "15px" }}></span>
              <strong>Exam Name:</strong> {examNames[index]}
            </li>
          ))}
        </ul>
      </div>
  </div>
);
};

export default ExamCalendar;
