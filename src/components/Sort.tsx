import { useState } from "react"
import React from 'react';

export const Sort  = () => {
    const [sort, setSort] = useState('relevance')
    return (<div className="sorting-container">
        <span className="sorting-label">Sort by</span>
        <select
          className="sorting-dropdown"
          value={sort}
          onChange={e => setSort(e.target.value)}
        >
          <option value="relevance">Relevance</option>
          <option value="name">Item Name</option>
          <option value="high">Higher Price</option>
          <option value="low">Lower Price</option>
        </select>
      </div>)
}
