import './App.css';
import MusicListComponent from './MusicListComponent';
import { BrowserRouter as Router, Route } from 'react-router-dom';


function App() {
  return (
    <div className="App">
      <Router>
        <div className="container">
          <Route exact path="/musicu" component={MusicListComponent} />
        </div>
      </Router>
    </div>
  );
}

export default App;
