import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Shoppingcart from './pages/shoppingcart';
import Login from './pages/Login';
import Signup from './pages/signup';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path='/cart' element={<Shoppingcart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>

      </Routes>
    </Router>
  );
}

export default App;
