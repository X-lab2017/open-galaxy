import scene from '../store/scene.js'
import clientRuntime from '../runtime/clientRuntime.js';
import { NodeList } from '../../components/NodeList/index.jsx';

import React, { useRef, useState } from 'react';
import intl from 'react-intl-universal';

export const Search = () => {
  const searchInputRef = useRef(null);
  const [searchResults, setSearchResults] = useState([]);

  const search = (e) => {
    const query = e.target.value;
    if (query && query[0] === ':') return; // processed in submit
    setSearchResults(scene.find(query));
  }

  const submit = (e) => {
    const command = searchInputRef.current.value;
    if (!command || command[0] !== ':') return; // We can handle only commands here

    // Yes, this is not secure, I know
    command = 'with (ctx) { ' + command.substr(1) + ' }';
    const dynamicFunction = new Function('ctx', command);
    dynamicFunction(clientRuntime);
    e.preventDefault();
  }

  const Title = (
    <h4 className="window-title">
      {intl.getHTML("COUNT_FOR_SEARCH_MATCHES", {
        count: searchResults.length,
      })}
    </h4>
  );

  return (
    <>
      {/* search input */}
      <div className='search'>
        <form className='search-form' role='search' onSubmit={submit}>
          <div className='input-group'>
            <input type='text'
              ref={searchInputRef}
              className='form-control no-shadow' placeholder={intl.get('SEARCH_PLACEHOLDER')}
              onChange={search} />
            <span className='input-group-btn'>
              <button className='btn' tabIndex='-1' type='button'>
                <span className='glyphicon glyphicon-search'></span>
              </button>
            </span>
          </div>
        </form>
      </div>
      {/* search result list */}
      {
        searchResults.length > 0 &&
        <NodeList
          className="window-container search-results-window"
          title={Title}
          nodes={searchResults}
        />
      }
    </>
  );
}