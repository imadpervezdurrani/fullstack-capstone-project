import React, { useState } from 'react';

const CATEGORIES = ['All', 'Living', 'Bedroom', 'Kitchen', 'Office', 'Toys'];

export default function MainPage({ gifts, onSelectGift, setView, loading }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const filteredGifts = activeCategory === 'All'
    ? gifts
    : gifts.filter(gift => gift.category?.toLowerCase() === activeCategory.toLowerCase());

  const scrollToGifts = () => {
    const section = document.getElementById('catalog-section');
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div>
      {/* Hero Section */}
      <section className="hero-section" id="hero-banner">
        <div className="hero-tag">
          🌱 Sustainable Community Recycling
        </div>
        <h1 className="hero-title">
          GiftLink — Share More, Waste Less
        </h1>
        <p className="hero-subtitle">
          Connect with people who want to give away household items they no longer need.
          Find free pre-loved treasures, recycle locally, and make a greener planet.
        </p>
        <div>
          <button
            className="cta-button"
            id="get-started-btn"
            onClick={scrollToGifts}
          >
            Get Started 🎁
          </button>
        </div>
      </section>

      {/* Category Pills Filter */}
      <div className="category-filter-bar" id="category-pills">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`category-pill ${activeCategory === cat ? 'active' : ''}`}
            onClick={() => setActiveCategory(cat)}
            id={`category-pill-${cat.toLowerCase()}`}
          >
            {cat === 'All' && '✨ '}
            {cat === 'Living' && '🛋️ '}
            {cat === 'Bedroom' && '🛏️ '}
            {cat === 'Kitchen' && '🍳 '}
            {cat === 'Office' && '💼 '}
            {cat === 'Toys' && '🧸 '}
            {cat}
          </button>
        ))}
      </div>

      {/* Gift Items Catalog */}
      <main className="gifts-container" id="catalog-section">
        <div className="section-header">
          <div>
            <h2>Explore Available Gifts</h2>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginTop: '0.25rem' }}>
              Free household goods ready for immediate local pickup
            </p>
          </div>
          <div className="items-counter" id="items-count">
            Showing <strong>{filteredGifts.length}</strong> items
          </div>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
            <p>Loading items from GiftLink database...</p>
          </div>
        ) : filteredGifts.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '4rem', color: 'var(--text-muted)' }}>
            <p>No gifts found in this category.</p>
          </div>
        ) : (
          <div className="gifts-grid" id="gifts-grid">
            {filteredGifts.map(gift => (
              <article
                key={gift.id}
                className="gift-card"
                onClick={() => onSelectGift(gift)}
                id={`gift-card-${gift.id}`}
              >
                <div className="card-image-wrap">
                  <img
                    src={gift.image}
                    alt={gift.name}
                    className="card-image"
                    loading="lazy"
                  />
                  <span className="card-category-badge">
                    {gift.category}
                  </span>
                  <span className={`card-condition-badge ${gift.condition?.toLowerCase() === 'fair' ? 'fair' : ''}`}>
                    {gift.condition}
                  </span>
                </div>

                <div className="card-content">
                  <h3 className="card-title">{gift.name}</h3>
                  <p className="card-desc">{gift.description}</p>
                  
                  <div className="card-footer">
                    <span>📍 Zip: {gift.zipcode || '10001'}</span>
                    <span style={{ color: 'var(--primary)', fontWeight: '600' }}>View Details &rarr;</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
