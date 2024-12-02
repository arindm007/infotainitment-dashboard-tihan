import React, { useState, useEffect } from 'react';

function DateTime() {
  const [time, setTime] = useState('');
  const [date, setDate] = useState('');

  useEffect(() => {
    const updateDateTime = () => {
      const now = new Date();
      const hours = String(now.getHours()).padStart(2, '0');
      const minutes = String(now.getMinutes()).padStart(2, '0');
      const timeString = `${hours}:${minutes}`;

      const dateOptions = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      };
      const dateString = now.toLocaleDateString(undefined, dateOptions);

      setTime(timeString);
      setDate(dateString);
    };

    const interval = setInterval(updateDateTime, 1000);
    updateDateTime(); // Initial call

    return () => clearInterval(interval); // Cleanup
  }, []);

  return (
    <div>
      <h1 className="text-2xl" style={{ fontSize: '1.5rem', margin: 0 }}>{time}</h1>
      <p className="text-gray-400" style={{ color: 'gray', margin: 0 }}>{date}</p>
    </div>
  );
}

export default DateTime;
