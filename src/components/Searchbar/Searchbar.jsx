import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ImSearch } from 'react-icons/im';
import {
  SearchHeader,
  SearchForm,
  SearchFormButton,
  SearchFormInput,
} from './styled';

function Searchbar({getSearchValue}) {
  const [searchValue, setSearchValue] = useState('');

  const handleChangeValue = (e) => setSearchValue(e.currentTarget.value.toLowerCase());
 
 const hanlerSubmitForm = e => {
    e.preventDefault();
    if (searchValue.trim() === '') {
      toast.error('Please, enter a word to search for.', {
        position: 'top-right',
        theme: 'light',
      });
      return;
   }
   getSearchValue(searchValue);
  };


  return (
      <SearchHeader>
        <SearchForm onSubmit={hanlerSubmitForm}>
          <SearchFormButton type="submit">
            <ImSearch size={25} />
          </SearchFormButton>

          <SearchFormInput
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            value={searchValue}
            onChange={handleChangeValue}
          />
        </SearchForm>
      </SearchHeader>
    );
}


Searchbar.propTypes = {
  getSearchValue: PropTypes.func.isRequired,
};

export default Searchbar;
