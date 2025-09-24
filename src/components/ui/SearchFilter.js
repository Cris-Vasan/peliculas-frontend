import React, { useState } from 'react'

export const SearchFilter = ({ onFilter, placeholder = "Buscar..." }) => {
  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e) => {
    const value = e.target.value
    setSearchTerm(value)
    onFilter(value)
  }

  return (
    <div className="mb-3">
      <div className="input-group">
        <span className="input-group-text bg-light">
          <i className="bi bi-search"></i>
        </span>
        <input
          type="text"
          className="form-control"
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
    </div>
  )
}
