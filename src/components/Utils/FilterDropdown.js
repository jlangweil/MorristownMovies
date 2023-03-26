import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import './FilterDropdown.css';

const customStyles = {
  control: (provided) => ({
    ...provided,
    backgroundColor: 'black',
  }),
  option: (provided, state) => ({
    ...provided,
    color: 'white',
    fontWeight: state.isSelected || state.data.className === 'all-movies-option' ? 'bold' : 'normal',
    fontStyle: state.isSelected || state.data.className === 'all-movies-option' ? 'italic' : 'normal',
  }),
  singleValue: (provided, state) => ({
    ...provided,
    color: 'white',
    fontWeight: state.data.className === 'all-movies-option' ? 'bold' : 'normal',
    fontStyle: state.data.className === 'all-movies-option' ? 'italic' : 'normal',
  }),
  menu: (provided) => ({
    ...provided,
    backgroundColor: '#9A2F2F',
  }),
};

const FilterDropdown = ({ setFilter }) => {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get('https://movies-six-gilt.vercel.app/api/movies');
        setMovies(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovies();
  }, []);

  const movieOptions = [
    { value: '', label: 'All Movies', className: 'all-movies-option' },
    ...movies.map(movie => ({ value: movie.MovieName, label: movie.MovieName })),
  ];

  const handleChange = (selectedOption) => {
    setFilter(selectedOption.value);
  };

  return (
    <div className="filter-dropdown">
      <Select
        options={movieOptions}
        onChange={handleChange}
        styles={customStyles}
      />
    </div>
  );
};

export default FilterDropdown;
