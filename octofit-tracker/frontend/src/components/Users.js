import React, { useEffect, useState } from 'react';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/users/`;

  useEffect(() => {
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        console.log('Users API endpoint:', endpoint);
        console.log('Fetched users data:', data);
        setUsers(data.results || data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Error fetching users:', err);
        setLoading(false);
      });
  }, [endpoint]);

  if (loading) {
    return (
      <div className="text-center my-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
        <p className="mt-2">Loading users...</p>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-info text-white">
        <h4 className="mb-0">
          <i className="bi bi-person me-2"></i>Users
        </h4>
      </div>
      <div className="card-body">
        {users.length === 0 ? (
          <div className="alert alert-info">No users found.</div>
        ) : (
          <div className="table-responsive">
            <table className="table table-striped table-hover">
              <thead className="table-dark">
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Name</th>
                  <th scope="col">Email</th>
                  <th scope="col">Team</th>
                  <th scope="col">Superhero</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, idx) => (
                  <tr key={user.id || idx}>
                    <th scope="row">{idx + 1}</th>
                    <td>
                      <strong>{user.name || 'N/A'}</strong>
                    </td>
                    <td>
                      <a href={`mailto:${user.email}`} className="text-decoration-none">
                        {user.email || 'N/A'}
                      </a>
                    </td>
                    <td>
                      <span className="badge bg-primary">
                        {user.team?.name || user.team || 'No Team'}
                      </span>
                    </td>
                    <td>
                      {user.is_superhero ? (
                        <span className="badge bg-success">🦸 Yes</span>
                      ) : (
                        <span className="badge bg-secondary">No</span>
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
        Total Users: {users.length}
      </div>
    </div>
  );
};

export default Users;
