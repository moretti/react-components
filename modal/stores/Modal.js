import { Store } from 'marty';
import ModalConstants from '../constants/Modal';

export default class ModalStore extends Store {
  constructor(options) {
    super(options);
    this.state = this.getInitialState();
    this.handlers = {
      _handleOpenModal: ModalConstants.OPEN_MODAL,
      _handleCloseModal: ModalConstants.CLOSE_MODAL,
      _handleCloseAllModals: ModalConstants.CLOSE_ALL_MODALS,
    };
  }

  getInitialState() {
    return { openModals: [] };
  }

  isOpen(modalId) {
    return this.state.openModals && this.state.openModals.indexOf(modalId) > -1;
  }

  dimIsActive() {
    return !!(this.state.openModals && this.state.openModals.length);
  }

  getZOffset(modalId) {
    return this.state.openModals.indexOf(modalId) + 1;
  }

  activeModalCount() {
    return this.state.openModals.length;
  }

  _handleOpenModal(modalId) {
    if (!modalId) {
      return;
    }
    const { openModals } = this.state;
    if (openModals.indexOf(modalId) === -1) {
      const newOpenModals = openModals.concat([ modalId ]);
      this.setState({
        openModals: newOpenModals,
      });
    }
  }

  _handleCloseModal(modalId) {
    if (!modalId) {
      return;
    }
    const currentIndex = this.state.openModals.indexOf(modalId);

    if (currentIndex > -1) {
      const openModals = this.state.openModals.slice(0);
      openModals.splice(currentIndex, 1);
      this.setState({ openModals });
    }
  }

  _handleCloseAllModals() {
    this.setState({ openModals: [] });
  }
}
