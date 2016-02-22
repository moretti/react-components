import { Button } from '../../button';
import React, { Component } from 'react';

const colors = ['blue', 'green', 'white', 'gray', 'grayDark', 'grayDarker'];

export default class Buttons extends Component {
  render() {
    return (
      <div>
        {colors.map((color) =>
          <div key={color} style={{paddingBottom: 10}}>
            <Button color={color} {...this.props}>{color}</Button>
          </div>
        )}
      </div>
    );
  }
}
