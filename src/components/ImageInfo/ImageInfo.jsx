import React, {useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import ErrorMassage from 'components/ErrorMassage/index';
import { fetchImage } from 'servise/imgApi';
import ImageGallery from 'components/ImageGallery/index';
import Loader from 'components/Loader/index';
import Button from 'components/Button/index';
import Modal from 'components/Modal/index';

const Status = {
  IDLE: 'idle',
  PENDING: 'pending',
  RESOLVED: 'resolved',
  REJECTED: 'rejected',
};

function ImageInfo({ searchValue }) {
  const [value, setValue] = useState('');
  const [status, setStatus] = useState(Status.IDLE);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(null);
  const [totalPages, setTotalPages] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);
  const [modalData, setModalData] = useState({ largeImageURL: '', tags: '' });

   useEffect(() => {
     setPage(1);
     setValue(searchValue)
  }, [searchValue]);

  useEffect(() => {
    
    if (!value) return;

     if (page === 1) {
      setImages([]);
    }
    setStatus(Status.PENDING);   
    fetchImage(value, page)
      .then(data => {
       
        setImages(prev => [...prev, ...data.hits]);
        setStatus(Status.RESOLVED);
        setTotalPages(Math.floor(data.totalHits / 12));
        
      })
      .catch(error => {
        setError(error);
        setStatus(Status.REJECTED);
      });
  }, [error, value, page]);

  const handleLoadMore = () => {
    setPage(prev => prev + 1);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const getModalData = ({ largeImageURL, tags }) => {
    setModalData({ largeImageURL, tags });
    setShowModal(true);
  };

  if (status === 'idle') {
    return;
  }

  if (status === 'pending') {
    return (
      <>
        {page !== 1 && (
          <ImageGallery images={images} onImageClick={getModalData} />
        )}
        <Loader />
      </>
    );
  }
  if (status === 'rejected') {
    return <ErrorMassage massage={error.massage} />;
  }

  if (images.length === 0) {
    return <ErrorMassage massage={`Nothing was found for your request.`} />;
  }

  if (status === 'resolved') {
    return (
      <>
        <ImageGallery images={images} onImageClick={getModalData} />
        {images.length > 0 && status !== 'pending' && page < totalPages && (
          <Button onClick={handleLoadMore} />
        )}
        {showModal && <Modal modalData={modalData} close={handleModalClose} />}
      </>
    );
  }
}

ImageInfo.propTypes = {
  value: PropTypes.string,
};

export default ImageInfo;
