import React from 'react';
import searchBoxModel from './searchBoxModel.js';
import intl from 'react-intl-universal';

module.exports = require('maco')(searchBar, React);

function searchBar(x) {
  x.render = function () {
    return (
        <div className='search'>
          <form className='search-form' role='search' onSubmit={runSubmit}>
            <div className='input-group'>
              <input type='text'
                ref='searchText'
                className='form-control no-shadow' placeholder={intl.get('SEARCH_PLACEHOLDER')}
                onChange={runSearch}/>
                <span className='input-group-btn'>
                  <button className='btn' tabIndex='-1' type='button'>
                    <span className='glyphicon glyphicon-search'></span>
                  </button>
                </span>
            </div>
          </form>
        </div>
    );
  };

  function runSearch(e) {
    searchBoxModel.search(e.target.value);
  }

  function runSubmit(e) {
    var searchText = React.findDOMNode(x.refs.searchText).value;
    searchBoxModel.submit(searchText);
    e.preventDefault();
  }
}
