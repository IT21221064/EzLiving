import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import { useNavigate } from "react-router-dom";
import { useReactToPrint } from "react-to-print";
import "./StockReport.css";

function StockReport() {
  const [items, setProducts] = useState([]);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const navigate = useNavigate();
  const componentPDF = useRef();

  const getCurrentDate = () => {
    const currentDate = new Date();
    return `${currentDate.toDateString()} ${currentDate.toLocaleTimeString()}`;
  };

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await axios.get("http://localhost:5000/api/items");
        setProducts(response.data);

        let totalValue = 0;
        for (const item of response.data) {
          totalValue += item.quantity * item.unitprice;
        }
        setTotalStockValue(totalValue);
      } catch (error) {
        console.error(error);
      }
    }

    fetchProducts();
  }, []);

  const generatePDF = useReactToPrint({
    content: () => componentPDF.current,
    documentTitle: "Stock Report",
    onAfterPrint: () => alert("Data saved in PDF"),
  });

  return (
    <div>
      <AdminNavbar />
      <br></br>
      <React.Fragment>
        <div ref={componentPDF} className="stock-report">
          <h4>EzLiving Pvt Limited</h4>
          <p>Your vision our appliances</p>
          <p>No. 551, Mihindu Mawatha, Malabe, Sri Lanka</p>
          <p>Email: EzLivinginternational@gmail.com</p>
          <p className="report-date">Report Date: {getCurrentDate()}</p>
          <hr />
          <table className="stock-table">
            <thead>
              <tr>
                <th>Item Code</th>
                <th>Item Name</th>
                <th>Unit Price</th>
                <th>Quantity</th>
                <th>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {items.map((item) => (
                <tr key={item._id}>
                  <td>{item.itemcode}</td>
                  <td>{item.itemname}</td>
                  <td>{item.unitprice}</td>
                  <td>{item.quantity}</td>
                  <td>{item.quantity * item.unitprice}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="total-stock-value">
            Total Stock Value: {totalStockValue}
          </p>
        </div>
        <button className="btn-success" onClick={generatePDF}>
          PDF/Download
        </button>
      </React.Fragment>
    </div>
  );
}

export default StockReport;
