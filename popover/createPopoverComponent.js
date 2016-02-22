import React, { Component, PropTypes } from 'react';
import { findDOMNode } from 'react-dom';
import invariant from 'invariant';
import values from 'lodash/object/values';
import assign from 'lodash/object/assign';
import Arrow from './Arrow';
import Placement from './Placement';
import Style from './Style';

export default function createPopoverComponent(Toggle, Content) {
  invariant(Toggle, 'expected Toggle to be a valid React component');
  invariant(Content, 'expected Menu to be a valid React component');

  class Popover extends Component {
    constructor(props) {
      super(props);
      this.state = {
        visible: false,
      };
    }

    handleToggleClick = () => {
      this.setState({
        visible: !this.state.visible,
      });
    }

    componentDidMount() {
      const contentNode = findDOMNode(this.refs.content);
      this.setState({
        contentHeight: contentNode.offsetHeight,
      });
    }

    render() {
      const { placement } = this.props;

      return (
        <div style={Style.Container}>
          <div style={Style.ToggleContainer} onClick={this.handleToggleClick}>
            <Toggle ref="toggle" />
          </div>
          <div style={this.getContentStyle()} ref="content">
            <Arrow size={Style.ARROW_SIZE} offset={Style.ARROW_SIZE} color={Style.ARROW_COLOR} orientation={placement} />
            <Content />
          </div>
        </div>
      );
    }

    getContentStyle() {
      const { visible, contentHeight } = this.state;
      const { placement } = this.props;

      if (!visible) {
        return assign({}, Style.ContentBase, Style.ContentInvisible);
      }
      switch (placement) {
        case Placement.TOP:
          return assign({
            top: -(contentHeight + Style.ARROW_SIZE),
            left: '50%',
            transform: 'translateX(-50%)',
          },
          Style.ContentBase);
        case Placement.RIGHT:
          return assign({
            top: '50%',
            left: '100%',
            marginLeft: Style.ARROW_SIZE,
            marginTop: -contentHeight / 2,
          },
          Style.ContentBase);
        case Placement.LEFT:
          return assign({
            top: '50%',
            right: '100%',
            marginRight: Style.ARROW_SIZE,
            marginTop: -contentHeight / 2,
          },
          Style.ContentBase);
        case Placement.BOTTOM:
          return assign({
            bottom: -(contentHeight + Style.ARROW_SIZE),
            left: '50%',
            transform: 'translateX(-50%)',
          },
          Style.ContentBase);
        default:
          throw new Error(`Invalid placement: ${placement}`);
      }
    }
  }

  Popover.propTypes = {
    placement: PropTypes.oneOf(values(Placement)).isRequired,
  };

  return Popover;
}
