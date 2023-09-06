import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import axios from 'axios';
import { useLocation } from "react-router-dom";

const PaymentDetails = () => {
    const location = useLocation();
    const param = new URLSearchParams(location.search);
    const receivedValue = param.get('totalPrice')

    const [cusName, setName] = useState('')
    const [address, setAddress] = useState('')
    const [contact, setContact] = useState('')
    const [totalPrice, setPrice] = useState(receivedValue || '') // Initialize with receivedValue
    const { user } = useAuthContext()
    const [emptyFields, setEmptyFields] = useState([])
    const [error, setError] = useState(null)
    const [isLoading, setIsLoading] = useState(null)
    const [cartItems, setCartItems] = useState([]);

    const [totalPrice1, setTotalPrice] = useState(0);

    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.get('http://localhost:5000/api/cart');
                setCartItems(response.data);
                calculateTotalPrice(response.data); // Calculate and set the total price
            } catch (error) {
                console.error(error);
            }
        }
        fetchCartItems()
        
        const fetchProfile = async () => {
            const response = await fetch(`http://localhost:5000/api/users/${user.userid}`)
            const json = await response.json()
            console.log(json.username)

            if (response.ok) {
                setName(json.username)
            }
        }
        fetchProfile()
    }, [user])

    const calculateTotalPrice = (items) => {
        const totalPrice = items.reduce(
            (total, item) => total + item.price * item.quantity,
            0
        );
        setTotalPrice(totalPrice);
    };

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await fetch('http://localhost:5000/api/payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cusName,
                    address,
                    contact,
                    totalPrice
                })
            })

            const json1 = await response.json()

            if (response.ok) {
                setAddress('')
                setContact('')
                setPrice(receivedValue || '') // Reset the price to receivedValue
                setError(null)
                setEmptyFields([])
            } else {
                setError(json1.error)
                setEmptyFields(json1.emptyFields)
            }
        } catch (error) {
            console.log(error)
        }
    }

    const pay = () => {
        const user = useAuthContext
        console.log(cartItems)
        axios.post('http://localhost:5000/api/stripe/create-checkout-session', {
            cartItems,
            userId: user._id
        }).then((res) => {
            if (res.data.url) {
                window.location.href = res.data.url;
            }
        }).catch((err) => console.log(err.message));
    }

    return (
        <form className="addpay" onSubmit={handleSubmit}>
            <h3>Payment Details</h3>
            <label>Name:</label>
            <input
                type="text"
                onChange={(e) => setName(e.target.value)}
                value={cusName}
            /><br />

            <label>Address:</label>
            <input
                type="text"
                onChange={(e) => setAddress(e.target.value)}
                value={address}
            /><br />

            <label>Contact:</label>
            <input
                type="text"
                onChange={(e) => setContact(e.target.value)}
                value={contact}
            /><br />

            <label>Total:</label>
            <input
                type="number"
                onChange={(e) => setPrice(e.target.value)}
                value={receivedValue}
            /><br />

            <button className="btnSubmit" disabled={isLoading} onClick={pay}>Checkout</button>
            {error && <div className="error">{error}</div>}
        </form>
    )
}

export default PaymentDetails;
