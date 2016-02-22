import React, { PropTypes, Component } from 'react';
import styles from './Button.css';
import cx from 'classnames';

function capitalizeWord(word) {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export default class Button extends Component {
  render() {
    const base = this.props.kind === 'link' ? styles.linkBase : styles.base;
    const kind = this.props.kind + capitalizeWord(this.props.color);
    const size = 'size' + capitalizeWord(this.props.size);

    const classes = cx(
      base,
      styles[kind],
      styles[size],
      { [styles.rounded]: this.props.rounded },
      { [styles.uppercase]: this.props.uppercase },
      { [styles.fullWidth]: this.props.fullWidth }
    );

    return (
      <button
        type={this.props.type}
        className={classes}
        disabled={this.props.disabled}
        onClick={this.props.onClick}
        onMouseOver={this.props.onMouseOver}
        onMouseOut={this.props.onMouseOut}
        onMouseDown={this.props.onMouseDown}
        onMouseUp={this.props.onMouseUp}
        title={this.props.title}>
        {this.props.children}
      </button>
    );
  }
}

Button.propTypes = {
  kind: PropTypes.oneOf(['default', 'hollow', 'link']).isRequired,
  color: PropTypes.oneOf(['gray', 'blue', 'green', 'white', 'grayDark', 'grayDarker']).isRequired,
  size: PropTypes.oneOf(['small', 'default', 'large']).isRequired,
  type: PropTypes.oneOf(['submit', 'reset', 'button']).isRequired,

  disabled: PropTypes.bool,
  rounded: PropTypes.bool,
  uppercase: PropTypes.bool,
  fullWidth: PropTypes.bool,

  onClick: PropTypes.func,
  onMouseOver: PropTypes.func,
  onMouseOut: PropTypes.func,
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  onHover: PropTypes.func,

  formRef: PropTypes.string,
  formId: PropTypes.string,
  form: PropTypes.node,

  title: PropTypes.string,
  children: PropTypes.node.isRequired,
};

Button.defaultProps = {
  color: 'gray',
  kind: 'default',
  size: 'default',
  type: 'submit',
  uppercase: false,
  fullWidth: false,
};
