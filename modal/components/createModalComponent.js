import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import Marty from 'marty';
import cx from 'classnames';
import Portal from 'react-portal';
import styles from './Modal.css';

const baseZIndex = 900;

export class Modal extends Component {
  handleModalClick = (e) => {
    if (e.target === findDOMNode(this.refs.modal)) {
      this.handleCloseModal();
    }
  }

  handleCloseModal = () => {
    if (this.props.onStateChange) {
      this.props.onStateChange({ open: false });
    }
    this.app.modalActions.close(this.props.id);
  }

  handleOpenModal = () => {
    if (this.props.onStateChange) {
      this.props.onStateChange({ open: true });
    }
    this.app.modalActions.open(this.props.id);
  }

  render() {
    const { isOpen, width, marginTop, kind, zIndex } = this.props;

    if (!isOpen) {
      return null;
    }

    const dialogStyle = {
      width,
      marginTop,
    };

    const bodyClasses = cx(styles.body, {
      [styles.rounded]: kind === 'rounded',
    });

    const localStyle = {
      zIndex: baseZIndex + zIndex,
    };

    return (
      <Portal isOpened={isOpen}>
        <div className={styles.modal} style={localStyle} ref="modal" onMouseDown={this.handleModalClick}>
          <div className={styles.dialog} style={dialogStyle}>
            <div className={bodyClasses}>
              {this.props.children}
            </div>
          </div>
        </div>
      </Portal>
    );
  }
}

Modal.propTypes = {
  id: PropTypes.string.isRequired,
  marginTop: PropTypes.number.isRequired,
  isOpen: PropTypes.bool,
  width: PropTypes.number.isRequired,
  onStateChange: PropTypes.func,
  kind: PropTypes.bool,
  children: PropTypes.node,
};

Modal.defaultProps = {
  width: 600,
  marginTop: 0,
};

export const ModalContainer = Marty.createContainer(Modal, {
  listenTo: 'modalStore',
  done() {
    return (
      <Modal
        ref="innerComponent"
        isOpen={this.app.modalStore.isOpen(this.props.id)}
        zIndex={this.app.modalStore.getZOffset(this.props.id)}
        {...this.props}
      />
    );
  },
});

ModalContainer.prototype.open = function() {
  this.refs.innerComponent.handleOpenModal();
};
ModalContainer.prototype.close = function() {
  this.refs.innerComponent.handleCloseModal();
};

let uniqueId = 0;
export default function createModalComponent(ModalBody, ModalHeader, ModalFooter) {
  const thisId = ++uniqueId;
  return class ThisModal extends Component {
    render() {
      return (
        <ModalContainer ref="modal" id={thisId} {...this.props}>
          {ModalHeader && <ModalHeader />}
          <ModalBody
            {...this.props}
            close={this.close.bind(this)}
            open={this.open.bind(this)}
          />
          {ModalFooter && <ModalFooter />}
        </ModalContainer>
      );
    }

    open() {
      return this.refs.modal.open();
    }

    close() {
      return this.refs.modal.close();
    }
  };
}
