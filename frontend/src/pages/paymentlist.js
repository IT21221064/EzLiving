import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import axios from "axios";
import "./paymentlist.css";
import AdminNavbar from "../components/AdminNavbar";

const Paymentlist = () => {
    const [Payments, setPayments] = useState([]);

    useEffect(() => {
        const fetchPayments = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/payment');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const contentType = response.headers.get('content-type');
                if (contentType && contentType.includes('application/json')) {
                    const json = await response.json();
                    setPayments(json);
                } else {
                    throw new Error('Response is not in JSON format');
                }
            } catch (error) {
                console.error(error);
            }
        }

        fetchPayments();
    }, []);

    const handleDelete = (_id) => {
        try {
            axios.delete("http://localhost:5000/api/payment/" + _id)
                .then((res) => {
                    // You may want to update the state or perform other actions after a successful delete
                    alert("Item deleted successfully");
                    window.location.reload();
                })
                .catch((er) => console.error(er));
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <AdminNavbar />
            <div className="container">
                <h2>Payment Details</h2>
                <table className="payment-table">
                    <thead>
                        <tr>
                            <th>Customer Name</th>
                            <th>Address</th>
                            <th>Contact</th>
                            <th>Total Price</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Payments.map((payment) => (
                            <tr key={payment._id}>
                                <td>{payment.cusName ?? 'N/A'}</td>
                                <td>{payment.address ?? 'N/A'}</td>
                                <td>{payment.contact ?? 'N/A'}</td>
                                <td>{payment.totalPrice ?? 'N/A'}</td>
                                <td>
                                    <button onClick={() => handleDelete(payment._id)}>Delete</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <br></br>
            <br></br>
            <Footer />
        </div>
    );
}

export default Paymentlist;
