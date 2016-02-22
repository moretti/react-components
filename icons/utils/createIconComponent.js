import React from 'react';
import styles from './Icon.css';
import cx from 'classnames';

export default function createIconComponent(svg) {
  class Icon extends React.Component {
    render() {
      const { style, size, className, ...other } = this.props;

      const inlineStyle = {
        width: size,
        height: size,
        ...style,
      };

      // We use dangerouslySetInnerHTML because react doesnt fully support
      // SVG 1.1: https://github.com/facebook/react/pull/938
      return (
        <div
          className={cx(styles.icon, className)}
          style={inlineStyle}
          dangerouslySetInnerHTML={{__html: svg}}
          {...other}>
        </div>
      );
    }
  }

  Icon.propTypes = {
    size: React.PropTypes.number.isRequired,
    style: React.PropTypes.object,
    className: React.PropTypes.string,
  };

  Icon.defaultProps = {
    size: 16,
    style: {},
  };

  return Icon;
}
