import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import Accueil from './components/accueil.jsx';
import RegisterForm from './LoginPage/RegisterForm.jsx';
import LoginForm from './LoginPage/LoginForm.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import Navbar from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Menu from './components/menu.jsx';
import RecherchePage from './components/ResearchPage.jsx';
import Contact from './components/contact.jsx';
import ProductSingle from './components/ProductSingle.jsx';
import '@hotwired/stimulus'
import OrderHistory from './components/orderHistory.jsx';
import OrderDetail from './components/OrderDetail.jsx';
import AccountSettings from './components/AccountSettings.jsx';
import Checkout from './components/StripePayment.jsx';
import Confirmation from './components/Confirmation';
import Panier from './components/Panier.jsx';
import Legal from './components/legal.jsx';
import Cgu from './components/cgu.jsx';
import About from './components/about.jsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const stripePromise = loadStripe('pk_test_51PfKZmKixfMhfPrWZ2P1UQnTDA7ohWcfHkcDWiIc6tniqXtBo22m28m8TQAGZqHuReZ0Uo8dWUt8CSrnzI4IEONR00iLw1yFqJ');

function App() {
  return (
    <div style={{ minHeight: "100vh" }}>
      <BrowserRouter>
        <div className="App">
          <header className="App-header">
            <Navbar />
            <Routes>
              <Route path="/" element={<Accueil />} />
              <Route path="/register" element={<RegisterForm />} />
              <Route path="/login" element={<LoginForm />} />
              <Route path="/orderHistory" element={<OrderHistory />} />
              <Route path="/product/:productId" element={<ProductSingle />} />
              <Route path="/category/:categoryId" element={<CategoryPage />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/recherche" element={<RecherchePage />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/orderDetail/:orderId" element={<OrderDetail />} />
              <Route path="/AccountSettings" element={<AccountSettings />} />
              <Route path="/confirmation" element={<Confirmation />} />
              <Route path="/Checkout" element={<Elements stripe={stripePromise}><Checkout /></Elements>} />
              <Route path="/Panier" element={<Panier />} />
              <Route path="/legal" element={<Legal />} />
              <Route path="/cgu" element={<Cgu />} />
              <Route path="/about" element={<About />} />

        
            </Routes>
            <Footer />
            <ToastContainer />

          </header>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;



