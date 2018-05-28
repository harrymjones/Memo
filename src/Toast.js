import React, { Component } from 'react';

import './Toast.css';

class Toast extends Component {
  constructor (props) {
    super(props);

    this.toast = React.createRef();

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
    }, 250);

    setTimeout(() => {
      this.setState({
        show: false
      });
    }, this.props.duration - 500);
  }

  render () {
    return (
      <div
        ref={ this.toast }
        className={ "toast toast--" + this.props.type + (this.state.show ? ' toast--show' : '') }>
        { this.props.text }
      </div>
    );
  }
}

export default Toast;
