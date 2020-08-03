import React, { useState, useEffect, useCallback } from 'react';
import Geocode from 'react-geocode';

Geocode.setApiKey(process.env.REACT_APP_GEOCODE_API);

export const GeoForm = ({ setLatLng }) => {
  const [value, setValue] = useState('Hong Kong');
  const getLatLng = useCallback(async (address) => {
    const res = await Geocode.fromAddress(address);
    const { lat, lng } = res.results[0].geometry.location;

    console.log(lat, lng);
    setLatLng({ lat, lng });
  }, []);

  useEffect(() => {
    getLatLng(value);
  }, []);

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
