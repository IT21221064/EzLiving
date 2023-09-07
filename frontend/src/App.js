



import { useAuthContext } from "./hooks/useAuthContext";
import AdminLogin from './pages/adminLogin'
import PaymentDetails from './pages/paymentDetails';

import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import ProductList from "./pages/ProductList";
import Shoppingcart from "./pages/shoppingcart";
import ItemList from "./pages/itemlist";
import AddItem from "./pages/addItem";
import UpdateItem from "./pages/updateItem";
import ItemPage from "./pages/ItemPage";
import AdminItemList from "./pages/AdminItemlist";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import FeedbackList from "./pages/feedbackList";
import AddReview from './pages/AddReview';
import ReviewList from './pages/ReviewList'
import AddFeedback from "./pages/AddFeedback";
import Welcome from "./pages/Welcome";

import UserProfile from './pages/UserProfile';
import UpdateProfile from './pages/updateProfile';

import { RefreshProvider } from "./context/RefreshContext";


function App() {
  const { user } = useAuthContext();
  return (
    <RefreshProvider>
    <Router>
      <Routes>

        <Route path="/" element={<Welcome />} />


        
        <Route path='/adminLogin' element={!user ? <AdminLogin /> : <Navigate to="/items" />}/>
        <Route path='/payment' element={<PaymentDetails/>}/>

        <Route path="/items" element={<ItemList />} />
        <Route path="/cart" element={<Shoppingcart />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/updateItem/:_id" element={<UpdateItem />} />
        <Route path="/itempage/:_id" element={<ItemPage />} />
        <Route path="/adminItemlist" element={<AdminItemList />} />
        <Route path="/login" element={
                      !user ? <Login /> : <Navigate to="/items" />
                    } />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/Feedback' element={<FeedbackList/>} />
        <Route path='/AddReview' element={<AddReview/>} />
        <Route path='/Review' element={<ReviewList/>} />
        <Route path="/AddFeedback" element={<AddFeedback />} />
        <Route path="/UserProfile" element={<UserProfile />} />
        <Route path="/UpdateProfile" element={<UpdateProfile />} />

      </Routes>
    </Router>
    </RefreshProvider>
  );
}

export default App;
