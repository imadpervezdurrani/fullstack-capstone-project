import React, { useState, useEffect } from 'react';
import { urlConfig } from '../../config';

export default function SearchPage({ onSelectGift }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [condition, setCondition] = useState('');
  const [ageYears, setAgeYears] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const performSearch = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('name', searchTerm);
      if (category && category !== 'All') params.append('category', category);
      if (condition && condition !== 'All') params.append('condition', condition);
      if (ageYears) params.append('age_years', ageYears);

      const res = await fetch(`${urlConfig.backendUrl}/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data);
    } catch (err) {
      console.error("Search error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    performSearch();
  }, [category, condition, ageYears]);

  const handleSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  return (
    <div className="gifts-container" style={{ maxWidth: '1100px', paddingTop: '2.5rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontSize: '2.4rem', color: '#fff', marginBottom: '0.5rem' }}>
          Search & Filter Gifts
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Find exactly what you need by keyword, category, or condition
        </p>
      </div>

      {/* Filter Controls Bar */}
      <form
        onSubmit={handleSubmit}
        style={{
          background: 'var(--bg-card)',
          border: '1px solid var(--border-glass)',
          borderRadius: 'var(--radius-md)',
          padding: '1.5rem',
          marginBottom: '2.5rem',
          backdropFilter: 'blur(12px)'
        }}
      >
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1rem' }}>
          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Search by Title</label>
            <input
              type="text"
              placeholder="e.g. Table, Chair, Lamp..."
              className="form-input"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
              id="search-input"
            />
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Category</label>
            <select
              className="form-select"
              value={category}
              onChange={e => setCategory(e.target.value)}
              id="category-select"
            >
              <option value="">All Categories</option>
              <option value="Living">Living</option>
              <option value="Bedroom">Bedroom</option>
              <option value="Kitchen">Kitchen</option>
              <option value="Office">Office</option>
              <option value="Toys">Toys</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Condition</label>
            <select
              className="form-select"
              value={condition}
              onChange={e => setCondition(e.target.value)}
              id="condition-select"
            >
              <option value="">Any Condition</option>
              <option value="New">New</option>
              <option value="Like New">Like New</option>
              <option value="Good">Good</option>
              <option value="Fair">Fair</option>
            </select>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Max Age (Years)</label>
            <input
              type="number"
              min="0"
              max="20"
              placeholder="Any age"
              className="form-input"
              value={ageYears}
              onChange={e => setAgeYears(e.target.value)}
            />
          </div>
        </div>

        <button type="submit" className="submit-btn" style={{ marginTop: '0.5rem' }} id="search-submit-btn">
          {loading ? 'Searching...' : 'Apply Filters 🔍'}
        </button>
      </form>

      {/* Search Results */}
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
          <h3>Search Results ({results.length})</h3>
        </div>

        {results.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>
            No gifts match your search criteria. Try adjusting the category or search keywords.
          </div>
        ) : (
          <div className="gifts-grid">
            {results.map(gift => (
              <article
                key={gift.id}
                className="gift-card"
                onClick={() => onSelectGift(gift)}
              >
                <div className="card-image-wrap">
                  <img src={gift.image} alt={gift.name} className="card-image" />
                  <span className="card-category-badge">{gift.category}</span>
                  <span className="card-condition-badge">{gift.condition}</span>
                </div>
                <div className="card-content">
                  <h4 className="card-title">{gift.name}</h4>
                  <p className="card-desc">{gift.description}</p>
                  <div className="card-footer">
                    <span>📍 Zip: {gift.zipcode || '10001'}</span>
                    <span style={{ color: 'var(--primary)' }}>Details &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
