import React, { Component } from 'react';
import Memo from './Memo';

class Memos extends Component {
  render () {
    const memos = this.props.memos.map(memo => {
      return (
        <Memo
          key={ memo.id }
          id={ memo.id }
          title={ memo.title }
          content={ memo.content }
          created={ memo.created_date }
          new={ memo.new }
          onTitleChange={ this.props.onTitleChange }
          onContentChange={ this.props.onContentChange }
          onRemove={ this.props.onRemove }
          onInputBlur={ this.props.onInputBlur }
          maxTitleLength="40"
          maxContentLength="140"
          showCharactersLeftLimit="15"
        />
      );
    });

    return (
      <div className="list">
        { memos }
      </div>
    );
  }
}

export default Memos;
