import React, { Component } from 'react';

import Toasts from './Toasts';
import PrimaryButton from './PrimaryButton';
import Memos from './Memos';
import Sort from './Sort';

import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor (props) {
      super(props);

      this.uuidv4 = this.uuidv4.bind(this);

      this.addMemo = this.addMemo.bind(this);
      this.removeMemo = this.removeMemo.bind(this);
      this.memoTitleChange = this.memoTitleChange.bind(this);
      this.memoContentChange = this.memoContentChange.bind(this);
      this.memoInputBlur = this.memoInputBlur.bind(this);

      this.sortChange = this.sortChange.bind(this);

      this.state = {
        "toasts": [],
        "memos": [],
        "sortBy": "created_date"
      };
  }

  /** Generate a unique ID for toasts and memos */
  // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
  uuidv4 () {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & (0x3 | 0x8));
      return v.toString(16);
    });
  }

  /** Add a toast notification */
  addToast (type, text, duration) {
    const toastsCopy = this.state.toasts.slice();
    const id = this.uuidv4();

    toastsCopy.push({
      "id": id,
      "type": type,
      "text": text,
      "duration": duration
    });

    this.setState({
      "toasts": toastsCopy
    });

    // Remove toast after duration has passed
    setTimeout(() => this.setState(prevState => ({
      "toasts": prevState.toasts.filter(toast => toast.id !== id)
    })), duration);
  }

  /** Add a new memo */
  addMemo () {
    // MOCKUP BACKEND REQUEST
    // fetch('/idea', {
    //   method: 'GET'
    // })
    // .then(res => res.json())
    // .then(
    //   (result) => {
    //     const newMemo = {
    //       "id": result.id,
    //       "title": "",
    //       "content": "",
    //       "created_date": result.created_date
    //     };
    //
    //     // Insert at the start of the new memos array
    //     memosCopy.splice(0, 0, newMemo);
    //
    //     this.setState({
    //       "memos": memosCopy
    //     }, () => {
    //       // Wait for the state to be committed, then show a notification
    //       this.addToast('notify', 'Memo saved', 3000);
    //       // And save to localStorage
    //       localStorage.setItem('memos', JSON.stringify(this.state.memos));
    //     });
    //   },
    //   (error) => {
    //     const toastsCopy = this.state.toasts.slice();
    //     toastsCopy.push({
    //       "id": this.uuidv4(),
    //       "type": "error",
    //       "text": "Error: couldn't remove memo. Please try again later",
    //       "duration": 0
    //     });
    //
    //     this.setState(prevState => ({
    //       "toasts": toastsCopy
    //     }));
    //   }
    // );

    const memosCopy = this.state.memos.slice();
    const created = Date.now();

    const newMemo = {
      "id": this.uuidv4(),
      "title": "",
      "content": "",
      "created_date": created,
      "new": true
    };

    // Insert at the start of the new memos array
    memosCopy.splice(0, 0, newMemo);

    this.setState({
      "memos": memosCopy
    }, () => {
      // Wait for the state to be committed, then show a notification
      this.addToast('notify', 'Memo added', 3000);
      // And save to localStorage
      localStorage.setItem('memos', JSON.stringify(this.state.memos));
    });
  }

  /** Remove a memo */
  removeMemo (id) {
    const remainingMemos = this.state.memos.filter(memo => {
      if (memo.id !== id) {
        return memo;
      }
      return false;
    });

    this.setState({
      "memos": remainingMemos
    }, () => {
      this.addToast('notify', 'Memo removed', 3000);
      localStorage.setItem('memos', JSON.stringify(this.state.memos));

      // MOCKUP BACKEND REQUEST
      // fetch('/idea/' + id, {
      //   method: 'DELETE'
      // })
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "notify",
      //       "text": "Memo removed",
      //       "duration": 3000
      //     });
      //
      //     this.setState(prevState => ({
      //       "toasts": toastsCopy
      //     }));
      //   },
      //   (error) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "error",
      //       "text": "Error: couldn't remove memo. Please try again later",
      //       "duration": 0
      //     });
      //
      //     this.setState(prevState => ({
      //       "toasts": toastsCopy
      //     }));
      //   }
      // );
    });
  }

  /** Called each time a memo's title is changed */
  memoTitleChange (id, value) {
    const memosAfter = this.state.memos.map(memo => {
      if (memo.id === id) {
        memo.title = value;
      }
      return memo;
    });

    this.setState({
      "memos": memosAfter
    });
  }

  /** Called each time a memo's content is changed */
  memoContentChange (id, value) {
    const memosAfter = this.state.memos.map(memo => {
      if (memo.id === id) {
        memo.content = value;
      }
      return memo;
    });

    this.setState({
      "memos": memosAfter
    });
  }

  /** Only called on memo input blur - used to trigger update saves */
  memoInputBlur (id, value, input) {
    let memoChanged;
    const savedMemos = JSON.parse(localStorage.getItem('memos')) || [];

    if (input === 'title') {
      memoChanged = savedMemos.filter(memo => {
        if (memo.id === id && memo.title !== value) {
            return memo;
        }
        return false;
      });
    } else {
      memoChanged = savedMemos.filter(memo => {
        if (memo.id === id && memo.content !== value) {
            return memo;
        }
        return false;
      });
    }

    // One of the fields is different from our last save
    if (memoChanged.length > 0) {
      // Make sure it doesn't think it's new
      const memosCopy = this.state.memos.slice();
      memosCopy.map(memo => {
        if (memo.id === id) {
          memo.new = false
        }
        return memo;
      })

      this.setState({
        "memos": memosCopy
      }, () => {
        this.addToast('notify', 'Changes saved', 3000);
        localStorage.setItem('memos', JSON.stringify(this.state.memos));
      });

      // MOCKUP BACKEND REQUEST
      // fetch('/idea/' + id, {
      //   method: 'PUT'
      // })
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "notify",
      //       "text": "Memo updated",
      //       "duration": 3000
      //     });
      //
      //     this.setState(prevState => ({
      //       "toasts": toastsCopy
      //     });
      //   },
      //   (error) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "error",
      //       "text": "Error: couldn't update memo. Please try again later",
      //       "duration": 5000
      //     });
      //
      //     this.setState(prevState => ({
      //       "toasts": toastsCopy
      //     }));
      //   }
      // );
    }
  }

  sortChange (sortBy) {
    const newMemos = this.state.memos.sort((a, b) => {
      var compareA = a[sortBy];
      var compareB = b[sortBy];

      if (sortBy === 'title') {
        compareA.toUpperCase();
        compareB.toUpperCase();

        if (compareA <= compareB) {
          return -1;
        } else {
          return 1;
        }
      } else if (sortBy === 'created_date') {
        if (compareA <= compareB) {
          return 1;
        } else {
          return -1;
        }
      } else {
        return false;
      }
    });

    this.setState({
      "sortBy": sortBy,
      "memos": newMemos
    })
  }

  /** Retrieve memos from local or backend on load */
  componentDidMount () {
    const memos = JSON.parse(localStorage.getItem('memos')) || [];

    // Only load memos from backend if we don't have any saved locally
    if (memos.length === 0) {
      // MOCKUP BACKEND REQUEST
      // fetch('/ideas', {
      //   method: 'POST'
      // })
      // .then(res => res.json())
      // .then(
      //   (result) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "notify",
      //       "text": "Loaded memos",
      //       "duration": 3000
      //     });
      //
      //     this.setState(prevState => ({
      //       "loaded": true,
      //       "memos": result,
      //       "toasts": toastsCopy
      //     }), () => {
      //       this.sortChange();
      //       localStorage.setItem('memos', JSON.stringify(this.state.memos));
      //     });
      //   },
      //   (error) => {
      //     const toastsCopy = this.state.toasts.slice();
      //     toastsCopy.push({
      //       "id": this.uuidv4(),
      //       "type": "error",
      //       "text": "Error: couldn't load memos. Please try again later",
      //       "duration": 0
      //     });
      //
      //     this.setState(prevState => ({
      //       "loaded": true,
      //       "toasts": toastsCopy
      //     }));
      //   }
      // );
      setTimeout(() => {
        this.setState({
          "loaded": true
        });
      }, 100);
    } else {
      setTimeout(() => {
        this.setState({
          "memos": memos,
          "loaded": true
        }, () => {
          this.sortChange(this.state.sortBy);
        });
      }, 100);
    }
  }

  render () {
    const emptyMessage = this.state.memos.length === 0 ? (
      <span className="empty-message empty-message--show">Sure is quiet around here...</span>
    ) : (
      <span className="empty-message">Sure is quiet around here...</span>
    );

    return (
      <div className={ "app " + (this.state.loaded ? "app--loaded" : "") }>
        <Toasts toasts={ this.state.toasts } />

        <header ref={ this.header } className="header">
          <h1 className="header__title">
            <img src={ logo } className="header__logo" alt="Memo" />
          </h1>
        </header>

        <main>
          <PrimaryButton
            text="ADD A MEMO"
            onClick={ this.addMemo } />

          <Sort
            sortBy={ this.state.sortBy }
            onChange={ this.sortChange }/>


          <Memos
            memos={ this.state.memos }
            onTitleChange={ this.memoTitleChange }
            onContentChange={ this.memoContentChange }
            onRemove={ this.removeMemo }
            onInputBlur={ this.memoInputBlur } />

          { emptyMessage }

        </main>
      </div>
    );
  }
}

export default App;
