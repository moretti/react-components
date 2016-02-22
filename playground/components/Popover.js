import React, { Component } from 'react';
import { Button } from '../../button';
import { createPopoverComponent } from '../../popover';

class Toggle extends Component {
  render() {
    return <Button>Click me</Button>;
  }
}

const contentStyle = {
  width: 300,
  padding: 10,
};

class Content extends Component {
  render() {
    return (
      <div style={contentStyle}>
        <b>Hello world</b>
        <ul>
          <li>foo</li>
          <li>bar</li>
          <li>spam</li>
          <li>eggs</li>
        </ul>
      </div>
    );
  }
}

const Popover = createPopoverComponent(Toggle, Content);

const alignerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const alignerItemStyle = {
  maxWidth: '50%',
};

export default class CentralAligner extends Component {
  render() {
    return (
      <div style={alignerStyle}>
        <div style={alignerItemStyle}>
          <Popover {...this.props}/>
        </div>
      </div>
    );
  }
}
