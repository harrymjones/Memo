import React, { Component } from 'react';
import './PrimaryButton.css';

class PrimaryButton extends Component {
  render () {
    return (
      <div className="primary-button">
        <button className="primary-button__button" onClick={ this.props.onClick }>{ this.props.text }</button>
      </div>
    );
  }
}

export default PrimaryButton;
