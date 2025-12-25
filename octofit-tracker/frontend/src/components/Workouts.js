import React, { useEffect, useState } from 'react';

const Workouts = () => {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Workouts API endpoint:', endpoint);
        console.log('Fetched workouts data:', data);
        setWorkouts(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching workouts:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading workouts...</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-danger text-white">
        <h4 className="mb-0">
          <i className="bi bi-heart-pulse me-2"></i>Workouts
        </h4>
      </div>
      <div className="card-body">
        {workouts.length === 0 ? (
          <div className="alert alert-info">No workouts found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Workout Name</th>
                  <th scope="col">Description</th>
                  <th scope="col">Suggested For</th>
                </tr>
              </thead>
              <tbody>
                {workouts.map((workout, idx) => (
                  <tr key={workout.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <strong className="text-danger">{workout.name || 'N/A'}</strong>
                    </td>
                    <td>{workout.description || 'No description'}</td>
                    <td>
                      {workout.suggested_for && workout.suggested_for.length > 0 ? (
                        workout.suggested_for.map((team, i) => (
                          <span key={i} className="badge bg-primary me-1">
                            {team.name || team}
                          </span>
                        ))
                      ) : (
                        <span className="text-muted">All teams</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="card-footer text-muted">
        Total Workouts: {workouts.length}
      </div>
    </div>
  );
};

export default Workouts;
