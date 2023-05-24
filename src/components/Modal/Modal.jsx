import { useEffect } from 'react';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';
import { Overlay, ModalContainer } from './styled';

const modalRoot = document.querySelector('#modal-root');

function Modal({ modalData, close }) {
  const { largeImageURL, tags } = modalData;

  useEffect(() => {
    const handlePressESC = e => {
      if (e.code === 'Escape') close();
    };
    document.addEventListener('keydown', handlePressESC);
    return () => {
      document.removeEventListener('keydown', handlePressESC);
    };
  }, [close]);

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) close();
  };

  return createPortal(
    <Overlay onClick={handleBackdropClick}>
      <ModalContainer>
        <img src={largeImageURL} alt={tags} />
      </ModalContainer>
    </Overlay>,
    modalRoot
  );
}

// class oldModal extends Component {
//   componentDidMount() {
//     window.addEventListener('keydown', this.handleKeyDown);
//   }

//   componentWillUnmount() {
//     window.removeEventListener('keydown', this.handleKeyDown);
//   }

//   handleKeyDown = e => {
//     if (e.code === 'Escape') {
//       this.props.onModalClose();
//     }
//   };

//     handleBackdropClick = e => {
//     if (e.currentTarget === e.target) {
//       this.props.onModalClose();
//     }
//   };

//   render() {
//     const { largeImageURL, tags } = this.props.modalData;
//     return createPortal(
//       <Overlay onClick={this.handleBackdropClick}>
//         <ModalContainer>
//           <img src={largeImageURL} alt={tags} />
//         </ModalContainer>
//       </Overlay>,
//       modalRoot
//     );
//   }
// }

Modal.propTypes = {
  modalData: PropTypes.shape({
    largeImageURL: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
  }),
  onModalClose: PropTypes.func.isRequired,
};

export default Modal;
