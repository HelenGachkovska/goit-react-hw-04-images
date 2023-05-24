import { Component, useState } from 'react';
import { ToastContainer } from 'react-toastify';
import Searchbar from './Searchbar/index';
import ImageInfo from './ImageInfo/index';

function App() {
  const [searchValue, setSearchValue] = useState('');
 
  const handleFormSubmit = searchValue => setSearchValue(searchValue);
  

  return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar getSearchValue={handleFormSubmit} />
        <ImageInfo searchValue={searchValue} />
        <ToastContainer autoClose={3000} />
      </div>
    );
 }

export class App extends Component {

  state = {
    searchValue: '',
  };

  handleFormSubmit = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr',
          gridGap: '16px',
          paddingBottom: '24px',
        }}
      >
        <Searchbar getSearchValue={handleFormSubmit} />
        <ImageInfo searchValue={this.state.searchValue} />
        <ToastContainer autoClose={3000} />
      </div>
    );
  }
}
