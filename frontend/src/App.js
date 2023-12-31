import { useAuthContext } from "./hooks/useAuthContext";
import AdminLogin from "./pages/adminLogin";
import PaymentDetails from "./pages/paymentDetails";
import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";

import Shoppingcart from "./pages/shoppingcart";
import ItemList from "./pages/itemlist";
import AddItem from "./pages/addItem";
import UpdateItem from "./pages/updateItem";
import ItemPage from "./pages/ItemPage";
import AdminItemList from "./pages/AdminItemlist";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import FeedbackList from "./pages/feedbackList";
import AddReview from "./pages/AddReview";
import ReviewList from "./pages/ReviewList";
import AddFeedback from "./pages/AddFeedback";
import Welcome from "./pages/Welcome";
import Paymentlist from "./pages/paymentlist";

import UserProfile from "./pages/UserProfile";
import UpdateProfile from "./pages/updateProfile";

import { RefreshProvider } from "./context/RefreshContext";
import DeleteFeedback from "./pages/deleteFeedback";
import UpdateReview from "./pages/updateReview";
import UserReview from "./pages/userReviews"
import StockReport from "./pages/stockReport";

function App() {
  const { user } = useAuthContext();
  return (
    <RefreshProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Welcome />} />

          <Route
            path="/adminLogin"
            element={!user ? <AdminLogin /> : <Navigate to="/adminItemlist" />}
          />
          <Route path="/payment" element={<PaymentDetails />} />
        <Route path="/UpdateReview/:_id" element={<UpdateReview />} />
        <Route path="/paymentlist" element={<Paymentlist />} />



          <Route path="/items" element={<ItemList />} />
          <Route path="/cart" element={<Shoppingcart />} />
          <Route path="/addItem" element={<AddItem />} />
          <Route path="/updateItem/:_id" element={<UpdateItem />} />
          <Route path="/itempage/:_id" element={<ItemPage />} />
          <Route path="/adminItemlist" element={<AdminItemList />} />
          <Route
            path="/login"
            element={!user ? <Login /> : <Navigate to="/items" />}
          />
          <Route path="/Signup" element={<Signup />} />
          <Route path="/Feedback" element={<FeedbackList />} />
          <Route path="/AddReview" element={<AddReview />} />
          <Route path="/Review" element={<ReviewList />} />
          <Route path="/AddFeedback" element={<AddFeedback />} />
          <Route path="/UserProfile" element={<UserProfile />} />
          <Route path="/UpdateProfile" element={<UpdateProfile />} />
          <Route path="/Adminfeedback" element={<DeleteFeedback />} />
          <Route path="/UserReview" element={<UserReview />} />
          <Route path="/report" element={<StockReport />} />
        </Routes>
      </Router>
    </RefreshProvider>
  );
}

export default App;
