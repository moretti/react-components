import React, { PropTypes, Component } from 'react';
import { findDOMNode } from 'react-dom';

export default class FilePrompt extends Component {
  shouldComponentUpdate(nextProps) {
    const currentProps = this.props;
    return Object.keys(FilePrompt.propTypes).some(key =>
      nextProps[key] !== currentProps[key]
    );
  }

  onFilesSelected = (event) => {
    event.preventDefault();
    event.stopPropagation();

    const { onSelect } = this.props;
    // Convert FileList to an Array
    if (typeof onSelect === 'function') {
      onSelect(Array.prototype.slice.call(event.target.files));
    }
  }

  openFilePrompt() {
    findDOMNode(this.refs.fileInput).click();
  }

  getStyle() {
    return {
      display: this.props.hidden ? 'none' : 'initial',
      ...this.props.style,
    };
  }

  getAcceptedTypes() {
    const { mimeType } = this.props;

    if (mimeType instanceof Array) {
      return mimeType.join(',');
    }
    return mimeType;
  }

  render() {
    return (
      <input
        type="file"
        ref="fileInput"
        multiple={this.props.multiple}
        style={this.getStyle()}
        onChange={this.onFilesSelected}
        accept={this.getAcceptedTypes()}
        />
    );
  }
}

FilePrompt.propTypes = {
  hidden: PropTypes.bool,
  mimeType: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.arrayOf(PropTypes.string),
  ]),
  multiple: PropTypes.bool,
  onSelect: PropTypes.func,
  style: PropTypes.object,
};

FilePrompt.defaultProps = {
  hidden: true,
  multiple: false,
  style: {},
};
