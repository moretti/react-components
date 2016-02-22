import React, { Component, PropTypes } from 'react';
//import Spring from '../../motion';
import keycode from 'keycode';
import styles from './Dim.css';

const baseZIndex = 900;

// Adadped from:
// https://github.com/twbs/bootstrap/blob/83bfff7f0765503b990b96c303eef67009e48d77/js/modal.js#L277
let _scrollbarWidth;
function getScrollbarWidth() {
  if (_scrollbarWidth !== undefined) {
    return _scrollbarWidth;
  }
  const div = document.createElement('div');
  div.className = styles.scrollbarMeasure;
  document.body.appendChild(div);
  _scrollbarWidth = div.offsetWidth - div.clientWidth;
  document.body.removeChild(div);
  return _scrollbarWidth;
}

export default class Dim extends Component {
  handleKeyDown = (e) => {
    if (e.keyCode === keycode('escape')) {
      this.props.onHide();
    }
  }

  componentWillReceiveProps(nextProps) {
    if (typeof window !== undefined) {
      if (nextProps.isActive && !this.props.isActive) {
        window.addEventListener('keydown', this.handleKeyDown);
      } else if (!nextProps.isActive && this.props.isActive) {
        window.removeEventListener('keydown', this.handleKeyDown);
      }
    }
    // Hide the Dim is the path has changed
    if (nextProps.path !== this.props.path) {
      this.props.onHide();
    }
  }

  adjustScrollbar() {
    if (typeof window === 'undefined') {
      return;
    }
    const bodyIsOverflowing = document.body.clientWidth < window.innerWidth;
    const scrollbarWidth = getScrollbarWidth();
    // TODO: keep track of the original values
    if (this.props.isActive && bodyIsOverflowing) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
      document.body.style.overflowY = 'hidden';
    } else {
      document.body.style.paddingRight = 0;
      document.body.style.overflowY = 'initial';
    }
  }

  render() {
    const { opacity, isActive, zIndex } = this.props;
    this.adjustScrollbar();

    const localStyle = {
      opacity,
      zIndex: baseZIndex + zIndex,
    };

    if (isActive) {
      return <div onClick={this.props.onHide} className={styles.dim} style={localStyle} />;
    } else {
      return <span />;
    }
  }
}

Dim.propTypes = {
  opacity: PropTypes.number.isRequired,
  onHide: PropTypes.func.isRequired,
  isActive: PropTypes.bool.isRequired,
  path: PropTypes.string.isRequired,
};

Dim.defaultProps = {
  opacity: 0.8,
};
