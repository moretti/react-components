import React, { Component } from 'react';
import Markdown from '../../markdown';

const alignerStyle = {
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const alignerItemStyle = {
  maxWidth: '50%',
};

const containerStyle = {
  width: 500,
  height: 500,
};


export default class CentralAligner extends Component {
  render() {
    return (
      <div style={alignerStyle}>
        <div style={alignerItemStyle}>
          <div style={containerStyle}>
            <Markdown {...this.props}/>
          </div>
        </div>
      </div>
    );
  }
}
