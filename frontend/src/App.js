import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
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

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ProductList />} />
        <Route path="/items" element={<ItemList />} />
        <Route path="/cart" element={<Shoppingcart />} />
        <Route path="/addItem" element={<AddItem />} />
        <Route path="/updateItem/:_id" element={<UpdateItem />} />
        <Route path="/itempage/:_id" element={<ItemPage />} />
        <Route path="/adminItemlist" element={<AdminItemList />} />
        <Route path="/login" element={<Login />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path='/Feedback' element={<FeedbackList/>} />
        <Route path='/AddReview' element={<AddReview/>} />
        <Route path='/Review' element={<ReviewList/>} />
        <Route path="/AddFeedback" element={<AddFeedback />} />

      </Routes>
    </Router>
  );
}

export default App;
