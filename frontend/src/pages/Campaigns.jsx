import React, { useState, useEffect } from 'react';
import { api } from '../api/client';
import { Trash2, Plus } from 'lucide-react';

export default function Campaigns() {
  const [campaigns, setCampaigns] = useState([]);
  const [advertisers, setAdvertisers] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const initialForm = { 
    name: '', 
    advertiserId: '', 
    previewUrl: '', 
    trackingUrl: '',
    runFrequency: 'daily',
    parameters: '{}'
  };
  const [formData, setFormData] = useState(initialForm);

  const fetchData = async () => {
    try {
      const [campData, advData] = await Promise.all([
        api.get('/campaigns'),
        api.get('/advertisers')
      ]);
      setCampaigns(campData);
      setAdvertisers(advData);
      if (advData.length > 0 && !formData.advertiserId) {
        setFormData(prev => ({...prev, advertiserId: advData[0].id}));
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let parsedParams = {};
      try {
        parsedParams = JSON.parse(formData.parameters);
      } catch (err) {
        alert("Invalid JSON for parameters");
        return;
      }

      await api.post('/campaigns', {
        ...formData,
        parameters: parsedParams
      });
      setFormData({...initialForm, advertiserId: advertisers[0]?.id || ''});
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this campaign?')) return;
    try {
      await api.delete(`/campaigns/${id}`);
      fetchData();
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <div className="flex-between">
        <h1>Campaigns</h1>
      </div>

      <div className="grid-2">
        <div className="glass-panel">
          <h3>Create New Campaign</h3>
          <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
            <div className="form-group">
              <label>Campaign Name</label>
              <input required className="form-control" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Advertiser</label>
              <select required className="form-control" value={formData.advertiserId} onChange={e => setFormData({...formData, advertiserId: e.target.value})}>
                {advertisers.length === 0 && <option value="">No Advertisers found</option>}
                {advertisers.map(adv => (
                  <option key={adv.id} value={adv.id}>{adv.name}</option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label>Preview URL</label>
              <input required type="url" className="form-control" value={formData.previewUrl} onChange={e => setFormData({...formData, previewUrl: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Tracking URL</label>
              <input required type="url" className="form-control" value={formData.trackingUrl} onChange={e => setFormData({...formData, trackingUrl: e.target.value})} />
            </div>
            <div className="form-group">
              <label>Run Frequency</label>
              <select className="form-control" value={formData.runFrequency} onChange={e => setFormData({...formData, runFrequency: e.target.value})}>
                <option value="hourly">Hourly</option>
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
              </select>
            </div>
            <div className="form-group">
              <label>Parameters (JSON)</label>
              <textarea className="form-control" value={formData.parameters} onChange={e => setFormData({...formData, parameters: e.target.value})} rows={3} />
            </div>
            <button type="submit" className="btn btn-primary">
              <Plus size={18} /> Add Campaign
            </button>
          </form>
        </div>

        <div className="glass-panel" style={{ overflowY: 'auto', maxHeight: '750px' }}>
          <h3>Campaigns List</h3>
          {loading ? <p>Loading...</p> : (
            <div className="table-container">
              <table>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Frequency</th>
                    <th>Tracking URL</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {campaigns.length === 0 ? (
                    <tr><td colSpan="4" style={{ textAlign: 'center' }}>No campaigns found</td></tr>
                  ) : campaigns.map(camp => (
                    <tr key={camp.id}>
                      <td>{camp.name}</td>
                      <td>{camp.runFrequency}</td>
                      <td><a href={camp.trackingUrl} target="_blank" rel="noreferrer" style={{color: 'var(--accent-light)'}}>Link</a></td>
                      <td>
                        <button className="btn btn-danger" onClick={() => handleDelete(camp.id)}>
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
