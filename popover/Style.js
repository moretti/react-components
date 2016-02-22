export default {
  ARROW_SIZE: 8,
  ARROW_COLOR: '#fff',

  Container: {
    position: 'relative',
    display: 'inline-block',
  },

  ToggleContainer: {
    display: 'inline-block',
  },

  ContentBase: {
    zIndex: 100, // decide
    borderRadius: 5,
    border: 'none',
    boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.3)',
    backgroundColor: '#fff',
    position: 'absolute',
  },

  ContentInvisible: {
    visibility: 'hidden',
    left: -99999999,
  },
};
