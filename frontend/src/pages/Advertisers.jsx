import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Trash2, Plus } from 'lucide-react';

export default function Advertisers() {
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState({ name: '', contactEmail: '', websiteUrl: '' });

  const fetchAdvertisers = async () => {
    try {
      const data = await api.get('/advertisers');
      setAdvertisers(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAdvertisers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/advertisers', formData);
      setFormData({ name: '', contactEmail: '', websiteUrl: '' });
      fetchAdvertisers();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this advertiser?')) return;
    try {
      await api.delete(`/advertisers/${id}`);
      fetchAdvertisers();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex-between">
        <h1>Advertisers</h1>
      </div>

      <div className="grid-2">
        <div className="glass-panel">
          <h3>Create New Advertiser</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label>Name</label>
              <input required className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Contact Email</label>
              <input required type="email" className="form-control" value={formData.contactEmail} onChange={e => setFormData({...formData, contactEmail: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Website URL (Optional)</label>
              <input type="url" className="form-control" value={formData.websiteUrl} onChange={e => setFormData({...formData, websiteUrl: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Add Advertiser
            </button>
          </form>
        </div>

        <div className="glass-panel" style={{ overflowY: 'auto', maxHeight: '600px' }}>
          <h3>Advertisers List</h3>
          {loading ? <p>Loading...</p> : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Contact</th>
                    <th>Website</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {advertisers.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>No advertisers found</td></tr>
                  ) : advertisers.map(adv => (
                    <tr key={adv.id}>
                      <td>{adv.name}</td>
                      <td>{adv.contactEmail}</td>
                      <td>{adv.websiteUrl ? <a href={adv.websiteUrl} target="_blank" rel="noreferrer" style={{color: 'var(--accent-light)'}}>Link</a> : '-'}</td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(adv.id)}>
                          <Trash2 size={16} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
