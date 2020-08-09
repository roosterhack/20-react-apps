import React, { useState, useEffect, useCallback } from 'react';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

export const GeoForm = ({ setLatLng }) => {
  const [value, setValue] = useState('Hong Kong');
  const getLatLng = useCallback(async (address) => {

    if (address) {
      const res = await Geocode.fromAddress(address);
      const { lat, lng } = res.results[0].geometry.location;
      setLatLng({ lat, lng });
    }


  }, [setLatLng]);

  useEffect(() => {
    getLatLng(value);
  }, [getLatLng, value]);

  const handleSubmit = (e) => {
    e.preventDefault();
    getLatLng(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type='text'
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </form>
  );
};
