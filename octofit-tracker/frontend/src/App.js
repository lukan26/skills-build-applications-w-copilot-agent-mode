
import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import logo from './octofitapp-small.png';

function App() {
  return (
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-dark mb-4">
        <div className="container">
          <Link className="navbar-brand" to="/">
            <img src={logo} alt="OctoFit Logo" />
            OctoFit Tracker
          </Link>
          <button 
            className="navbar-toggler" 
            type="button" 
            data-bs-toggle="collapse" 
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/activities">
                  <i className="bi bi-lightning me-1"></i>Activities
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/leaderboard">
                  <i className="bi bi-trophy me-1"></i>Leaderboard
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/teams">
                  <i className="bi bi-people me-1"></i>Teams
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/users">
                  <i className="bi bi-person me-1"></i>Users
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/workouts">
                  <i className="bi bi-heart-pulse me-1"></i>Workouts
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="container">
        <Routes>
          <Route path="/activities" element={<Activities />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/users" element={<Users />} />
          <Route path="/workouts" element={<Workouts />} />
          <Route path="/" element={
            <div className="welcome-section">
              <img src={logo} alt="OctoFit Logo" className="welcome-logo" />
              <h2>Welcome to OctoFit Tracker!</h2>
              <p className="lead">Track your fitness activities, compete with teams, and achieve your goals.</p>
              <div className="row mt-4">
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title text-primary">Track Activities</h5>
                      <p className="card-text">Log your daily workouts and monitor your progress over time.</p>
                      <Link to="/activities" className="btn btn-primary">View Activities</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title text-primary">Join Teams</h5>
                      <p className="card-text">Team up with others and compete for the top spot.</p>
                      <Link to="/teams" className="btn btn-primary">View Teams</Link>
                    </div>
                  </div>
                </div>
                <div className="col-md-4 mb-3">
                  <div className="card h-100">
                    <div className="card-body text-center">
                      <h5 className="card-title text-primary">Leaderboard</h5>
                      <p className="card-text">See how you rank against other fitness enthusiasts.</p>
                      <Link to="/leaderboard" className="btn btn-primary">View Leaderboard</Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          } />
        </Routes>
      </div>
    </div>
  );
}

export default App;
