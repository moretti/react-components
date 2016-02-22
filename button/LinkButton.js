import React, { PropTypes, Component } from 'react';
import Button from './Button';
import assign from 'lodash/object/assign';

export default class LinkButton extends Component {
  render() {
    const { to, params, query, onClick, ...buttonProps } = this.props;
    const transition = event => {
      if (onClick) {
        onClick(event);
      }
      this.context.router.transitionTo(to, params, query);
    };

    return (
      <Button {...buttonProps} onClick={transition}>
        {this.props.children}
      </Button>
    );
  }
}

LinkButton.contextTypes = {
  router: PropTypes.func.isRequired,
};

LinkButton.propTypes = assign({
  to: PropTypes.string.isRequired,
  params: PropTypes.object,
  query: PropTypes.object,
}, Button.propTypes);

LinkButton.defaultProps = assign({
  params: {},
  query: {},
}, Button.defaultProps);
