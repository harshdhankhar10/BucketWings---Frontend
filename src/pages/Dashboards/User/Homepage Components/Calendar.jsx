import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css'; // Import calendar styles

const CustomCalendar = () => {
  return (
    <div className=" rounded-lg shadow-lg max-w-md mx-auto">
      <div className="  overflow-hidden">
        <Calendar
          className="w-full"
          tileClassName="hover:bg-blue-100 focus:outline-none active:bg-blue-200"

        />
      </div>
    </div>
  );
};

export default CustomCalendar;
