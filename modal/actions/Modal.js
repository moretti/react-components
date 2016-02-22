import { ActionCreators } from 'marty';
import ModalConstants from '../constants/Modal';

export default class ModalActionCreators extends ActionCreators {
  open(modalId) {
    this.dispatch(ModalConstants.OPEN_MODAL, modalId);
  }

  close(modalId) {
    this.dispatch(ModalConstants.CLOSE_MODAL, modalId);
  }

  closeAll() {
    this.dispatch(ModalConstants.CLOSE_ALL_MODALS);
  }
}
