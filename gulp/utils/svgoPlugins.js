// removes `fill` attributes
export const removeFill = {
  type: 'perItem',
  fn(item) {
    if (item.isElem() && item.hasAttr('fill')) {
      item.removeAttr('fill');
    }
  },
};

// Remove <style> and `class` attributes
export const removeStyle = {
  type: 'perItem',
  fn(item) {
    if (item.isElem()) {
      if (item.elem === 'style') {
        return false;
      }
      if (item.hasAttr('class')) {
        item.removeAttr('class');
      }
    }
  },
};
