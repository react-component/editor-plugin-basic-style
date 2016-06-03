import * as React from 'react';

const BoldStyle = {
  constructor: function(config = {}) {
    return {
      name: 'bold',
      component: <span className="editor-icon editor-icon-bold" />,
      callbacks: {},
    };
  },
  config: {},
}

export default BoldStyle;
