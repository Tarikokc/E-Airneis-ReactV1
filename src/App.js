import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/accueil.jsx';
import RegisterForm from './LoginPage/RegisterForm.jsx';
import LoginForm from './LoginPage/LoginForm.jsx';
import CategoryPage from './components/CategoryPage.jsx';
import Navbar from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Menu from './components/menu.jsx';
import SearchBar from './components/search.jsx';
import Contact from './components/contact.jsx';
import ProductSingle from './components/ProductSingle.jsx';
import '@hotwired/stimulus'
import OrderHistory from './components/orderHistory.jsx';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <header className="App-header">
          <Navbar /> 
          <Routes> 
            <Route path="/" element={<Accueil />} />
            <Route path="/register" element={<RegisterForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/orderHistory" element={<OrderHistory />} />
            <Route path="/category/:categoryId" element={<CategoryPage />} />
            <Route path="/menu" element={<Menu />} />
            <Route path="/search" element={<SearchBar />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/product/:productId" element={<ProductSingle/>} />
          </Routes>
          <Footer />  
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;



