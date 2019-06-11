import React, {Component} from 'react';

import UserList from '../UserList';
import Style from './styles.scss';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      query: null
    };

    this.onChangeInput = this.onChangeInput.bind(this);
    this.onSubmitForm = this.onSubmitForm.bind(this);
  }

  onChangeInput(e) {
    e.preventDefault();
    this.setState({inputValue: e.target.value});
  }

  onSubmitForm(e) {
    e.preventDefault();
    this.setState(state => ({query: state.inputValue}));
  }

  render() {
    const {query} = this.state;
    return (
      <>
        <form onSubmit={this.onSubmitForm}>
          <input
            className={Style.searchInput}
            type="text"
            placeholder="search github users"
            onChange={this.onChangeInput}
          />
          <button
            className={Style.searchButton}
            type="submit">
              Search
          </button>
        </form>
        {query && <UserList query={query} />}
      </>
    );
  }
}

export default App;
