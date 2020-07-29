import React, { useState, useEffect } from 'react';

const addHttps = (url) => {
  if (!url.startsWith('http') || !url.startsWith('https')) {
    return `http://${url}`;
  }
  return url;
};

export default function AddressBar({ update, url }) {
  const [value, setValue] = useState(url || '');

  useEffect(() => {
    setValue(url);
  }, [url]);

  const handleSubmit = (e) => {
    e.preventDefault();
    //check for https
    const httpsUrl = addHttps(value);
    update(httpsUrl);
  };

  return (
    <div className='address-bar'>
      <form onSubmit={handleSubmit}>
        <input
          type='text'
          name='url'
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />
      </form>
    </div>
  );
}
