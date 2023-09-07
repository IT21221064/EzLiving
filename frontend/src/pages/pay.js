import axios from "axios";


const pay = ({cartItems}) => {

    const handleCheckout = () => {
        console.log(cartItems)
    };



    return (
        <>
        <button onClick={() => handleCheckout()}>CheckOut</button></>
    );
}

export default pay