import React, { useState } from 'react';

function Search({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleChange = (event) => {
    setTerm(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSearch(term);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={term} onChange={handleChange} placeholder="Rechercher un produit..." />
      <button type="submit">Rechercher</button>
    </form>
  );
}

export default Search;
