import React, { useContext, useMemo, useState, useEffect } from 'react';
import './mobile-reset.css';
import './App.css';
import './mobile-optimizations.css';
import './mobile-utilities.css';
import './mobile-final.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import Checkout from './Pages/Checkout';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png';
import women_banner from './Components/Assets/banner_women.png';
import kid_banner from './Components/Assets/banner_kids.png';
import Contact from './Pages/Contact';
import Admin from './Pages/Admin';
import Item from './Components/Item/Item';
import { ShopContext } from './Context/ShopContext';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';

const Company = () => (
  <div className="page-shell">
    <header className="page-header">
      <h1>About CrazyShopping</h1>
      <p>We are a community-driven retailer curating quality fashion for all ages.</p>
    </header>
    <section className="page-section">
      <h2>Our Mission</h2>
      <p>Deliver delightful shopping experiences with trusted products, inclusive sizing, and transparent pricing.</p>
    </section>
    <section className="page-section">
      <h2>Why Shop With Us</h2>
      <ul>
        <li>Locally sourced collections updated monthly.</li>
        <li>Free shipping and returns across India.</li>
        <li>Trusted payment gateways with price protection.</li>
      </ul>
    </section>
  </div>
);

const ProductsPage = () => {
  const { all_products } = useContext(ShopContext);
  const [query, setQuery] = useState('');
  const [categories, setCategories] = useState({ men: true, women: true, kid: true });
  const [sort, setSort] = useState('featured');
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const pageSize = 12;

  const toNumber = (value) => {
    const parsed = Number(value);
    return Number.isFinite(parsed) ? parsed : null;
  };

  const sanitizedMin = toNumber(minPrice);
  const sanitizedMax = toNumber(maxPrice);

  useEffect(() => setPage(1), [query, categories, sort, sanitizedMin, sanitizedMax]);

  const filtered = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return all_products.filter((product) => {
      const categoryMatch = categories[product.category] === true;
      const nameMatch = !normalizedQuery || product.name.toLowerCase().includes(normalizedQuery);
      const priceMatch = (() => {
        const price = Number(product.new_price);
        if (!Number.isFinite(price)) return false;
        if (sanitizedMin !== null && price < sanitizedMin) return false;
        if (sanitizedMax !== null && price > sanitizedMax) return false;
        return true;
      })();
      return categoryMatch && nameMatch && priceMatch;
    });
  }, [all_products, categories, query, sanitizedMin, sanitizedMax]);

  const sortedProducts = useMemo(() => {
    const clone = [...filtered];
    switch (sort) {
      case 'price-asc':
        return clone.sort((a, b) => a.new_price - b.new_price);
      case 'price-desc':
        return clone.sort((a, b) => b.new_price - a.new_price);
      case 'name-asc':
        return clone.sort((a, b) => a.name.localeCompare(b.name));
      case 'name-desc':
        return clone.sort((a, b) => b.name.localeCompare(a.name));
      default:
        return clone;
    }
  }, [filtered, sort]);

  const totalPages = Math.max(1, Math.ceil(sortedProducts.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * pageSize;
  const pagedProducts = sortedProducts.slice(startIndex, startIndex + pageSize);

  const toggleCategory = (key) => setCategories((previous) => ({ ...previous, [key]: !previous[key] }));

  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Shop the Latest Collection</h1>
        <p>Refine by category, price range, and sort by preferences.</p>
      </header>

      <div className="product-grid-layout">
        <aside className="filters-panel">
          <div className="filter-group">
            <label className="filter-label" htmlFor="product-search">Search</label>
            <input
              id="product-search"
              className="filter-input"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search products"
            />
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Categories</h3>
            {['men', 'women', 'kid'].map((category) => (
              <label key={category} className="filter-checkbox">
                <input
                  type="checkbox"
                  checked={Boolean(categories[category])}
                  onChange={() => toggleCategory(category)}
                />
                <span className="filter-checkbox__label">{category}</span>
              </label>
            ))}
          </div>

          <div className="filter-group">
            <h3 className="filter-heading">Price Range</h3>
            <div className="filter-price-row">
              <input
                className="filter-input"
                type="number"
                min={0}
                value={minPrice}
                onChange={(event) => setMinPrice(event.target.value)}
                placeholder="Min"
              />
              <span className="filter-price-separator">-</span>
              <input
                className="filter-input"
                type="number"
                min={0}
                value={maxPrice}
                onChange={(event) => setMaxPrice(event.target.value)}
                placeholder="Max"
              />
            </div>
          </div>

          <div className="filter-group">
            <label className="filter-label" htmlFor="sort-by">Sort by</label>
            <select
              id="sort-by"
              className="filter-input"
              value={sort}
              onChange={(event) => setSort(event.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name-asc">Name: A to Z</option>
              <option value="name-desc">Name: Z to A</option>
            </select>
          </div>
        </aside>

        <section className="products-panel">
          <div className="products-toolbar">
            <p>
              Showing {sortedProducts.length === 0 ? 0 : startIndex + 1}-{Math.min(startIndex + pageSize, sortedProducts.length)} of {sortedProducts.length} products
            </p>
          </div>

          <div className="shopcategory-products">
            {pagedProducts.map((product) => (
              <Item
                key={product.id}
                id={product.id}
                name={product.name}
                image={product.image}
                new_price={product.new_price}
                old_price={product.old_price}
              />
            ))}
            {sortedProducts.length === 0 && <p>No products match the current filters.</p>}
          </div>

          <nav className="pagination">
            <button onClick={() => setPage((value) => Math.max(1, value - 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button onClick={() => setPage((value) => Math.min(totalPages, value + 1))} disabled={currentPage === totalPages}>
              Next
            </button>
          </nav>
        </section>
      </div>
    </div>
  );
};

const OffersPage = () => {
  const { all_products } = useContext(ShopContext);
  const offers = all_products.filter((product) => Number(product.old_price) > Number(product.new_price));
  return (
    <div className="page-shell">
      <header className="page-header">
        <h1>Limited Time Offers</h1>
        <p>Discover mark-downs across our best-selling categories.</p>
      </header>
      <div className="shopcategory-products">
        {offers.map((product) => (
          <Item
            key={product.id}
            id={product.id}
            name={product.name}
            image={product.image}
            new_price={product.new_price}
            old_price={product.old_price}
          />
        ))}
        {offers.length === 0 && <p>No offers currently available. Check back soon!</p>}
      </div>
    </div>
  );
};

const About = () => (
  <div className="page-shell">
    <header className="page-header">
      <h1>About CrazyShopping</h1>
      <p>We are passionate about delivering great products at competitive prices. Our mission is to make shopping simple and enjoyable.</p>
    </header>
    <section className="page-section">
      <h2>Customer Promise</h2>
      <p>Every order is quality checked before shipping. If something is amiss, our support team is just a message away.</p>
    </section>
  </div>
);

const isAuthed = () => {
  try {
    return !!localStorage.getItem('authToken');
  } catch (error) {
    console.error('Failed to read auth token', error);
    return false;
  }
};

const RequireAuth = ({ children }) => {
  const location = useLocation();
  if (!isAuthed()) {
    return <Navigate to={`/login?redirect=${encodeURIComponent(location.pathname + location.search)}`} replace />;
  }
  return children;
};

function App() {
  const basename = process.env.NODE_ENV === 'production' && process.env.PUBLIC_URL ? process.env.PUBLIC_URL : '';

  return (
    <div className="App">
      <BrowserRouter basename={basename}>
        <Navbar />
        <main className="main-content">
          <Routes>
            <Route path='/login' element={<LoginSignup />} />
            <Route path='/privacy' element={<Privacy />} />
            <Route path='/terms' element={<Terms />} />
            <Route path='/' element={<RequireAuth><Shop /></RequireAuth>} />
            <Route path='/mens' element={<RequireAuth><ShopCategory banner={men_banner} category="men" /></RequireAuth>} />
            <Route path='/womens' element={<RequireAuth><ShopCategory banner={women_banner} category="women" /></RequireAuth>} />
            <Route path='/kids' element={<RequireAuth><ShopCategory banner={kid_banner} category="kid" /></RequireAuth>} />
            <Route path='/product/:productId' element={<RequireAuth><Product /></RequireAuth>} />
            <Route path='/cart' element={<RequireAuth><Cart /></RequireAuth>} />
            <Route path='/checkout' element={<RequireAuth><Checkout /></RequireAuth>} />
            <Route path='/contact' element={<RequireAuth><Contact /></RequireAuth>} />
            <Route path='/company' element={<RequireAuth><Company /></RequireAuth>} />
            <Route path='/products' element={<RequireAuth><ProductsPage /></RequireAuth>} />
            <Route path='/offers' element={<RequireAuth><OffersPage /></RequireAuth>} />
            <Route path='/about' element={<RequireAuth><About /></RequireAuth>} />
            <Route path='/admin/*' element={<RequireAuth><Admin /></RequireAuth>} />
          </Routes>
        </main>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
