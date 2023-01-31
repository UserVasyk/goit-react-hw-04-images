import PropTypes from 'prop-types';
import { useState } from 'react';
import {
  Searchbar,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './Searchbar.styled';
import { FaSearch } from 'react-icons/fa';

export const SearchBar = ({ onSubmit }) => {
  const [text, setText] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(text);
    setText('');
    evt.target.reset();
  };
  const onChangeInput = evt => {
    setText(evt.target.value);
  };

  return (
    <Searchbar>
      <SearchForm onSubmit={handleSubmit}>
        <SearchFormButton type="submit">
          <FaSearch />
        </SearchFormButton>
        <SearchFormInput
          type="text"
          autocomplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={onChangeInput}
        />
      </SearchForm>
    </Searchbar>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
