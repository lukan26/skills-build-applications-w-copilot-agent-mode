import React, { useEffect, useState } from 'react';

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/leaderboards/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Leaderboard API endpoint:', endpoint);
        console.log('Fetched leaderboard data:', data);
        const sortedData = (data.results || data).sort((a, b) => b.total_points - a.total_points);
        setLeaderboard(sortedData);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching leaderboard:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading leaderboard...</p>
      </div>
    );
  }

  const getMedalClass = (index) => {
    if (index === 0) return 'bg-warning text-dark'; // Gold
    if (index === 1) return 'bg-secondary text-white'; // Silver
    if (index === 2) return 'bg-danger text-white'; // Bronze
    return 'bg-light text-dark';
  };

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-warning text-dark">
        <h4 className="mb-0">
          <i className="bi bi-trophy me-2"></i>Leaderboard
        </h4>
      </div>
      <div className="card-body">
        {leaderboard.length === 0 ? (
          <div className="alert alert-info">No leaderboard data found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">Rank</th>
                  <th scope="col">Team</th>
                  <th scope="col">Total Points</th>
                </tr>
              </thead>
              <tbody>
                {leaderboard.map((entry, idx) => (
                  <tr key={entry.id || idx} className={idx < 3 ? 'table-active' : ''}>
                    <th scope="row">
                      <span className={`badge ${getMedalClass(idx)}`}>
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : idx + 1}
                      </span>
                    </th>
                    <td>
                      <strong>{entry.team?.name || entry.team || 'N/A'}</strong>
                    </td>
                    <td>
                      <span className="badge bg-success fs-6">
                        {entry.total_points || 0} pts
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted">
        Total Teams: {leaderboard.length}
      </div>
    </div>
  );
};

export default Leaderboard;
