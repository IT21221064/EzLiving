import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProductList from './pages/ProductList';
import Shoppingcart from './pages/shoppingcart';
import Login from './pages/Login';
import Signup from './pages/signup';
import AdminLogin from './pages/adminLogin'
import PaymentDetails from './pages/paymentDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path='/cart' element={<Shoppingcart/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/Signup' element={<Signup/>}/>
        <Route path='/adminLogin' element={<AdminLogin/>}/>
        <Route path='/payment' element={<PaymentDetails/>}/>

      </Routes>
    </Router>
  );
}

export default App;
