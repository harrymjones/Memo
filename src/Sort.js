import React, { Component} from 'react';
import './Sort.css';

class Sort extends Component {
  constructor (props) {
    super(props);

    this._onChange = this._onChange.bind(this);

    this.state = {
      "options": [
        {
          "field": "created_date",
          "title": "Newest first"
        },
        {
          "field": "title",
          "title": "Title"
        }
      ]
    }
  }

  _onChange (event) {
    this.props.onChange (event.target.value);
  }

  render () {
    const options = this.state.options.map(option => {
      return <option key={ option.field } value={ option.field }>{ option.title }</option>
    });

    return (
      <div className="sort">
        <span className="sort__text">SORT BY:</span>
        <select
          className="sort__dropdown"
          value={ this.props.sortBy }
          onChange={ this._onChange }>
          { options }
        </select>
      </div>
    );
  }
}

export default Sort;
