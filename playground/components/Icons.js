import React, { Component, PropTypes } from 'react';
import allIcons from '../../icons';
import forIn from 'lodash/object/forIn';

const tdStyle = {
  padding: 0,
  height: 50,
  borderBottom: '1px solid #ccc',
};

export default class IconList extends Component {
  render() {
    const tbody = [];
    forIn(allIcons, (Icon, name) => tbody.push(
      <tr key={name}>
        <td style={tdStyle}>{name}</td>
        <td style={tdStyle}><Icon {...this.props} /></td>
      </tr>
    ));

    return <table>
      <thead>
        <tr><th>Name</th><th>Preview</th></tr>
      </thead>
      <tbody>
        {tbody}
      </tbody>
    </table>;
  }
}

IconList.propTypes = {
  size: PropTypes.number,
  style: PropTypes.object,
};

IconList.defaultProps = {
  size: 48,
};
