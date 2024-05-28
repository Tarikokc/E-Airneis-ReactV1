// import './App.css';
// import Accueil from './accueil.jsx';
// import RegisterForm from './LoginPage/RegisterForm.jsx';
// import LoginForm from './LoginPage/LoginForm.jsx';
// import CategoryPage from './ProduitList.jsx';
// import Navbar from './nav.jsx';
// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <Navbar />

//         {/* <Accueil />  */}
//         {/* <RegisterForm /> */}
//         {/* <LoginForm /> */}
//         <CategoryPage /> 

//       </header>
//     </div>
//   );
// }

// export default App;

import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Accueil from './components/accueil.jsx';
import RegisterForm from './LoginPage/RegisterForm.jsx';
import LoginForm from './LoginPage/LoginForm.jsx';
import CategoryPage from './components/ProduitList.jsx';
import Navbar from './components/nav.jsx';
import Footer from './components/footer.jsx';
import Contact from './components/contact.jsx';
function App() {
  return (
    <BrowserRouter> 
      <div className="App">
        <header className="App-header">
          <Navbar /> 
          <Footer />
          <Routes> 
            {/* <Route path="/" element={<Accueil />} />  */}
            {/* <Route path="/" element={<RegisterForm />} /> */}
            <Route path="/" element={<LoginForm />} />
            {/* <Route path="/" element={<Contact />} /> */}
            {/* <Route path="/" element={<CategoryPage />} />  */}
          </Routes>
        </header>
      </div>
    </BrowserRouter>
  );
}

export default App;
