import Headers from './components/Headers';
import Home from './components/Home';
import CartDetails from './components/CartDetails';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes,Route} from "react-router-dom"
import toast, { Toaster } from 'react-hot-toast';
import Sucess from './components/Sucess';
import Cancel from './components/Cancel';
import CheckoutForm from './components/CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
function App() {
  const stripePromise = loadStripe('pk_test_51PEQ9RSHmG6dlknyz4zCZxZDY412eF9HHXnyfatfXJ2RbOYR4LpuP1lI444PUSDmpmVLHgHzrcNyJgNZq2uXMt1V00GXDWNnut');
  return (
    <>
     <Headers />
     <Elements stripe={stripePromise}>
     <Routes>
      <Route  path='/' element={<Home />}/>
      <Route  path='/cart' element={<CartDetails />}/>
      <Route  path='/sucess' element={<Sucess />}/>
      <Route  path='/cancel' element={<Cancel />}/>
      <Route  path='/paymentform' element={<CheckoutForm />}/>
     </Routes>
     <Toaster />
     </Elements>
    </>
  );
}

export default App;
