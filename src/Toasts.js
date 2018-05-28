import React, { Component } from 'react';
import Toast from './Toast';

import './Toasts.css';

class Toasts extends Component {
  render () {
    const toastsCopy = this.props.toasts.slice();
    // Reverse toasts to show the latest on top
    toastsCopy.reverse();
    const toasts = toastsCopy.map(toast => {
      return (
        <Toast
          key={ toast.id }
          id={ toast.id }
          type={ toast.type}
          text={ toast.text }
          duration={ toast.duration }
        />
      );
    });

    return (
      <div className="toasts">
        { toasts }
      </div>
    );
  }
}

export default Toasts;
