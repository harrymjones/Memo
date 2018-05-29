import React, { Component } from 'react';

import './Toast.css';

class Toast extends Component {
  constructor (props) {
    super(props);

    this.state = {
      show: false
    };
  }

  /** Add/alter delay to show & hide with animation  */
  componentDidMount () {
    setTimeout(() => {
      this.setState({
        show: true
      });

      if (this.props.duration) {
        // Remove 500ms for toasts over 1 second long to animate out
        const d = this.props.duration;
        const animateOutTime = d > 1000 ? d - 500 : d;

        setTimeout(() => {
          this.setState({
            show: false
          });
        }, animateOutTime);
      }
    }, 250);
  }

  render () {
    return (
      <div
        className={ "toast " + (this.props.type ? "toast--" + this.props.type : "") + (this.state.show ? ' toast--show' : '') }>
        { this.props.text }
      </div>
    );
  }
}

export default Toast;
