import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Shoppingcart from './pages/shoppingcart';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path='/cart' element={<Shoppingcart/>}/>
      </Routes>
    </Router>
  );
}

export default App;
