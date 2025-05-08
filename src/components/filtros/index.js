import React, { useState } from "react";

export default function FilterDate({ onFilter }) {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const handleFilter = () => {
    onFilter(startDate, endDate);
  };

  return (
    <div className="filter-date">
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={handleFilter}>Filtrar</button>
    </div>
  );
}
