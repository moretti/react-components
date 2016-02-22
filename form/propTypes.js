import { PropTypes } from 'react';

const BaseInput = {
  autofocus: PropTypes.bool,
  disabled: PropTypes.bool,
  id: PropTypes.string,
  maxlength: PropTypes.number,
  minlength: PropTypes.number,
  onBlur: PropTypes.func,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  placeholder: PropTypes.string,
  readonly: PropTypes.bool,
  required: PropTypes.bool,
};

export const TextInput = { ...BaseInput, ...{
  type: PropTypes.oneOf([
    'color',
    'date',
    'datetime',
    'datetime-local',
    'email',
    'month',
    'number',
    'password',
    'search',
    'tel',
    'text',
    'time',
    'url',
    'week',
  ]).isRequired,
  value: PropTypes.string,
  layout: PropTypes.oneOf(['inline', 'inline-left', 'default']),
}};

export const TextArea = { ...BaseInput, ...{
  cols: PropTypes.number,
  rows: PropTypes.number,
  value: PropTypes.string,
  layout: PropTypes.oneOf(['inline', 'inline-left', 'default']),
  autoSize: PropTypes.bool,
}};

export const Autosuggest = { ...BaseInput, ...{
  config: PropTypes.object,
}};

export const Markdown = { ...BaseInput, ...{
  autoSize: PropTypes.bool.isRequired,
  displayControls: PropTypes.bool.isRequired,
  previewClassName: PropTypes.string,
}};
