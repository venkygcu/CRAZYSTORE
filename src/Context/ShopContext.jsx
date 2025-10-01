import React, { createContext, useState, useEffect } from 'react';
import all_products from '../Components/Assets/all_product';
import api from '../api/client';

export const ShopContext = createContext(null);

const getDefaultCart = (products = []) => {
  const cart = {};
  products.forEach((product) => {
    cart[product.id] = 0;
  });
  return cart;
};

const ShopContextProvider = (props) => {
  const [allProductsDynamic, setAllProductsDynamic] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState(getDefaultCart());

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setAllProductsDynamic(response.data || []);
      } catch (error) {
        console.error('Failed to fetch products:', error);
        // Fallback to static products if API fails
        setAllProductsDynamic(all_products);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
    const handler = () => fetchProducts();
    window.addEventListener('products-updated', handler);
    return () => window.removeEventListener('products-updated', handler);
  }, []);

  useEffect(() => {
    setCartItems(getDefaultCart(allProductsDynamic));
  }, [allProductsDynamic]);

  const addToCart = (itemId) => {
    setCartItems((previous) => ({ ...previous, [itemId]: previous[itemId] + 1 }));
  };

  const removeFromCart = (itemId) => {
    setCartItems((previous) => ({ ...previous, [itemId]: previous[itemId] - 1 }));
  };

  const getTotalCartAmount = () => {
    let totalAmount = 0;
    Object.entries(cartItems).forEach(([item, quantity]) => {
      if (quantity > 0) {
        const itemInfo = allProductsDynamic.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * quantity;
        }
      }
    });
    return totalAmount;
  };

  const getTotalItems = () => {
    let totalItems = 0;
    Object.values(cartItems).forEach((quantity) => {
      if (quantity > 0) {
        totalItems += quantity;
      }
    });
    return totalItems;
  };

  const getTotalCartItems = () => {
    let totalItems = 0;
    Object.values(cartItems).forEach((quantity) => {
      if (quantity > 0) {
        totalItems += quantity;
      }
    });
    return totalItems;
  };

  const contextValue = {
    all_products: allProductsDynamic,
    all_products_static: all_products,
    loading,
    cartItems,
    addToCart,
    removeFromCart,
    getTotalCartAmount,
    getTotalCartItems,
    getTotalItems,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};

export default ShopContextProvider;
