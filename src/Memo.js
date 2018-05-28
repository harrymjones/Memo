import React, { Component } from 'react';
import './Memo.css';

class Memo extends Component {
  constructor (props) {
    super(props);

    this.memo = React.createRef();
    this.titleInput = React.createRef();
    this.contentInput = React.createRef();

    this.updateCharactersLeft = this.updateCharactersLeft.bind(this);
    this.hideCharactersLeft = this.hideCharactersLeft.bind(this);

    this._onRemove = this._onRemove.bind(this);
    this._onTitleChange = this._onTitleChange.bind(this);
    this._onContentChange = this._onContentChange.bind(this);
    this._onInputBlur = this._onInputBlur.bind(this);

    this.state = {
      "showCharactersLeft": false,
      "charactersLeft": this.props.maxContentLength - this.props.content.length
    }
  }

  /** Update the 'x characters left' text under the memo's content */
  updateCharactersLeft () {
    const charactersLeft = this.props.maxContentLength - this.contentInput.current.value.length;

    // ShowCharactersLeft if we're under the threshold
    this.setState({
      "charactersLeft": charactersLeft,
      "showCharactersLeft": charactersLeft < this.props.showCharactersLeftLimit
    });
  }

  /** Force hide the 'characters left' text - used on blur */
  hideCharactersLeft () {
    this.setState({
      "showCharactersLeft": false
    });
  }

  /** Trigger remove when the remove button is clicked */
  _onRemove () {
    this.memo.current.classList.add('memo--hide');

    setTimeout(() => {
      this.props.onRemove(this.props.id);
    }, 1400);
  }

  /** Send the updated title back to App */
  _onTitleChange (event) {
    this.props.onTitleChange(this.props.id, event.target.value);
  }

  /** Send the updated content back to App & update 'characters left' text */
  _onContentChange (event) {
    this.updateCharactersLeft();

    this.props.onContentChange(this.props.id, event.target.value);
  }

  /** Generic event for blurred input - used to trigger saves in App */
  _onInputBlur (event) {
    let input;
    if (event.target.classList.contains('memo__title-input')) {
      input = 'title';
    } else {
      input = 'content';
      this.hideCharactersLeft();
    }

    this.props.onInputBlur(this.props.id, event.target.value, input);
  }

  /** Animate in on load */
  componentDidMount () {
    this.memo.current.classList.add('memo--show-before');
    setTimeout(() => {
      this.memo.current.classList.add('memo--show');

      setTimeout(() => {
        this.memo.current.classList.remove('memo--show-before');
        if(this.props.new) {
          this.titleInput.current.focus();
        }
      }, 1400);
    }, 100);
    // new TimelineMax()
    // .to(this.memo.current, 0.6, {
    //     height: 225,
    //     ease: Expo.easeOut
    // })
    // .to(this.memo.current, 0.4, {
    //   opacity: 1,
    //   onComplete: () => {
    //     // Trigger focus on new memos

    //   }
    // });
  }

  render () {
    const date = new Date(this.props.created).toLocaleDateString();

    return (
      <div ref={ this.memo } className="memo">
        <button className="memo__remove" onClick={ this._onRemove }>
          <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10">
            <path fill="#000" fillRule="evenodd" d="M6.41421356 5l3.5355339 3.5355339-1.41421355 1.41421357L5 6.41421357l-3.5355339 3.5355339L.05025252 8.5355339 3.58578643 5 .05025254 1.4644661 1.4644661.05025252 5 3.58578643 8.5355339.05025254 9.94974748 1.4644661 6.41421357 5z"/>
          </svg>
        </button>
        <small className="memo__date">{ date }</small>
        <h4 className="memo__title">
          <textarea
            ref={ this.titleInput }
            className="memo__title-input"
            maxLength={ this.props.maxTitleLength }
            rows="1"
            placeholder="What's your idea?"
            value={ this.props.title }
            onChange={ this._onTitleChange }
            onBlur={ this._onInputBlur }>
          </textarea>
        </h4>
        <hr className="memo__divider" />
        <p className="memo__content">
          <textarea
            ref={ this.contentInput }
            className="memo__content-input"
            maxLength={ this.props.maxContentLength }
            rows="3"
            placeholder="Now flesh it out a bit..."
            value={ this.props.content }
            onChange={ this._onContentChange }
            onFocus={ this.updateCharactersLeft }
            onBlur={ this._onInputBlur }>
          </textarea>
        </p>
        <small
          className={ "memo__count " + (this.state.showCharactersLeft ? "memo__count--show" : "") }>
          { this.state.charactersLeft } characters left
        </small>
      </div>
    );
  }
}

export default Memo;
