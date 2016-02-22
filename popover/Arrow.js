import React, { Component, PropTypes } from 'react';
import assign from 'lodash/object/assign';
import values from 'lodash/object/values';
import Placement from './Placement';

const baseStyle = {
  width: 0,
  height: 0,
  display: 'inline-block',
  position: 'absolute',
};

export default class Arrow extends Component {
  getStyle() {
    const { size, orientation, color, offset } = this.props;

    let orientationStyle;

    switch (orientation) {
      case Placement.TOP:
        orientationStyle = {
          borderTopColor: color,
          bottom: -(size + offset),
          left: '50%',
          transform: 'translateX(-50%)',
        };
        break;
      case Placement.RIGHT:
        orientationStyle = {
          borderRightColor: color,
          left: -(size + offset),
          top: '50%',
          transform: 'translateY(-50%)',
        };
        break;
      case Placement.LEFT:
        orientationStyle = {
          borderLeftColor: color,
          right: -(size + offset),
          top: '50%',
          transform: 'translateY(-50%)',
        };
        break;
      case Placement.BOTTOM:
        orientationStyle = {
          borderBottomColor: color,
          top: -(size + offset),
          left: '50%',
          transform: 'translateX(-50%)',
        };
        break;
      default:
        throw new Error(`Invalid orientation: ${orientation}`);
    }

    return assign({
      border: `${size}px solid transparent`,
    }, baseStyle, orientationStyle);
  }

  render() {
    return <div style={this.getStyle()} />;
  }

}

Arrow.propTypes = {
  offset: PropTypes.number.isRequired,
  align: PropTypes.oneOf(['center']).isRequired,
  color: PropTypes.string.isRequired,
  size: PropTypes.number.isRequired,
  orientation: PropTypes.oneOf(values(Placement)).isRequired,
};

Arrow.defaultProps = {
  offset: 0,
  align: 'center',
};
