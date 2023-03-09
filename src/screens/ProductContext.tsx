import React, { createContext, useState } from 'react';

export const ProductContext = createContext({});

export const ProductProvider = ({ children }) => {
  const [lastScannedProduct, setLastScannedProduct] = useState(null);

  return (
    <ProductContext.Provider value={{ lastScannedProduct, setLastScannedProduct }}>
      {children}
    </ProductContext.Provider>
  );
};