import React from "react";

const Filters = ({ filters, setFilters }) => {
  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  return (
    <div className="bg-white p-4 rounded-2xl shadow-sm mb-6 flex flex-wrap gap-4 items-center">
      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data Inicial
        </label>
        <input
          type="date"
          name="startDate"
          value={filters.startDate}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          Data Final
        </label>
        <input
          type="date"
          name="endDate"
          value={filters.endDate}
          onChange={handleChange}
          className="border p-2 rounded-md"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Loja</label>
        <select
          name="store"
          value={filters.store}
          onChange={handleChange}
          className="border p-2 rounded-md"
        >
          <option value="all">Todas</option>
          <option value="A">Loja A</option>
          <option value="B">Loja B</option>
          <option value="C">Loja C</option>
        </select>
      </div>
    </div>
  );
};

export default Filters;
