
import './App.css';
import HomePage from './pages/HomePage';
import { KeycloakProvider } from './context/KeyclockContext';

function App() {
  return (
    <KeycloakProvider>
      <HomePage />
    </KeycloakProvider>
  );
}

export default App;
