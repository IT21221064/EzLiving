import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProductList from "./pages/ProductList";
import Shoppingcart from "./pages/shoppingcart";
import ItemList from "./pages/itemlist";
import AddItem from "./pages/addItem";
import UpdateItem from "./pages/updateItem";
import ItemPage from "./pages/ItemPage";
import AdminItemList from "./pages/AdminItemlist";

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
      </Routes>
    </Router>
  );
}

export default App;
