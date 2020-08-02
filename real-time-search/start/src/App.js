import React from 'react';
import './App.css';
import algoliasearch from 'algoliasearch';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
} from 'react-instantsearch-dom';

// ===== OPTION 1: if you want to create your own algolia account and fill it with data =====
// demo data: https://www.algolia.com/doc/guides/building-search-ui/resources/demos/react/#media
// sample datasets on github: https://github.com/algolia/datasets

// ===== OPTION 2: if you want to get started quickly =====
// app id: 0PZTXL7AZ6
// api key: 961853433f9efd5ebfbff8d2d6f7cfa2
// index name: myshop

const searchClient = algoliasearch(
  process.env.REACT_APP_ID,
  process.env.REACT_APP_API_KEY
);

export default function App() {
  return (
    <InstantSearch searchClient={searchClient} indexName='myshop'>
      <div className='app'>
        <div className='search-container'>
          <SearchBox />
          <Hits hitComponent={Product} />
          <Pagination />
        </div>
      </div>
    </InstantSearch>
  );
}

const Product = ({ hit }) => {
  return (
    <a
      href={hit.url}
      className='product'
      target='_blank'
      rel='noopener noreferrer'
    >
      <img src={hit.image} alt={hit.name} />
      <div>
        <h3>{hit.brand}</h3>
        <h2>{hit.name}</h2>
        <p>{hit.price}</p>
      </div>
    </a>
  );
};
