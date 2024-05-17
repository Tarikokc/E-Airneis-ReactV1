import './App.css';
import Accueil from './accueil.jsx';
import RegisterForm from './LoginPage/RegisterForm.jsx';
import LoginForm from './LoginPage/LoginForm.jsx';
import CategoryPage from './ProduitList.jsx';
import Navbar from './nav.jsx';
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Navbar />

        {/* <Accueil />  */}
        {/* <RegisterForm /> */}
        {/* <LoginForm /> */}
        <CategoryPage /> 

      </header>
    </div>
  );
}

export default App;
