import React, { useState } from 'react';
import { urlConfig } from '../../config';

export default function DetailsPage({ gift, onClose, onCommentAdded, user }) {
  const [commentText, setCommentText] = useState('');
  const [authorName, setAuthorName] = useState(user ? user.firstName : '');
  const [submitting, setSubmitting] = useState(false);

  if (!gift) return null;

  const handleAddComment = async (e) => {
    e.preventDefault();
    if (!commentText.trim()) return;

    setSubmitting(true);
    try {
      const res = await fetch(`${urlConfig.backendUrl}/api/gifts/${gift.id}/comments`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          author: authorName || (user ? user.firstName : 'Neighbor'),
          comment: commentText
        })
      });
      const data = await res.json();
      if (data.comment) {
        onCommentAdded(gift.id, data.comment);
        setCommentText('');
      }
    } catch (err) {
      console.error("Error submitting comment:", err);
    } finally {
      setSubmitting(false);
    }
  };

  const getSentimentBadge = (score) => {
    if (score > 0.1) {
      return <span className="sentiment-badge positive">😊 Positive ({score})</span>;
    } else if (score < -0.1) {
      return <span className="sentiment-badge negative">🙁 Needs Attention ({score})</span>;
    }
    return <span className="sentiment-badge neutral">😐 Neutral ({score})</span>;
  };

  return (
    <div className="modal-overlay" onClick={onClose} id="details-modal-overlay">
      <div className="modal-card" onClick={e => e.stopPropagation()} id="details-modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Close modal">
          ✕
        </button>

        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem', maxHeight: '320px' }}>
          <img
            src={gift.image}
            alt={gift.name}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <span className="card-category-badge" style={{ position: 'static' }}>
            🏷️ {gift.category}
          </span>
          <span className="card-condition-badge" style={{ position: 'static' }}>
            ✨ {gift.condition}
          </span>
          <span style={{ padding: '0.3rem 0.75rem', borderRadius: 'var(--radius-full)', background: 'rgba(255,255,255,0.08)', fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
            📍 Zip: {gift.zipcode || '10001'}
          </span>
        </div>

        <h2 style={{ fontSize: '1.75rem', marginBottom: '0.75rem', color: '#fff' }}>
          {gift.name}
        </h2>

        <p style={{ color: 'var(--text-secondary)', lineHeight: '1.7', marginBottom: '1.5rem' }}>
          {gift.description}
        </p>

        {/* Claim button */}
        <div style={{ padding: '1rem', background: 'rgba(16, 185, 129, 0.08)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-active)', marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontWeight: '600', color: 'var(--primary)' }}>Ready for Free Pickup</div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Connect with donor to claim this item</div>
          </div>
          <button
            className="submit-btn"
            style={{ width: 'auto', padding: '0.6rem 1.4rem' }}
            onClick={() => alert(`Gift claimed! We have notified the donor for ${gift.name}.`)}
          >
            Claim Gift 🎁
          </button>
        </div>

        {/* Comments Section */}
        <div style={{ borderTop: '1px solid var(--border-glass)', paddingTop: '1.5rem' }}>
          <h3 style={{ fontSize: '1.25rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            💬 Community Inquiries ({gift.comments ? gift.comments.length : 0})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
            {(!gift.comments || gift.comments.length === 0) ? (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>
                No questions or comments yet. Be the first to ask!
              </p>
            ) : (
              gift.comments.map((c, i) => (
                <div
                  key={i}
                  style={{
                    background: 'rgba(11, 15, 25, 0.6)',
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-sm)',
                    border: '1px solid var(--border-glass)'
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: '600', color: '#fff', fontSize: '0.9rem' }}>
                      👤 {c.author}
                    </span>
                    {c.sentiment !== undefined && getSentimentBadge(c.sentiment)}
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                    {c.comment}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Add Comment Form */}
          <form onSubmit={handleAddComment} style={{ background: '#0f1626', padding: '1.25rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-glass)' }}>
            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#fff' }}>Ask a Question or Leave Feedback</h4>
            {!user && (
              <div className="form-group">
                <input
                  type="text"
                  placeholder="Your Name (Optional)"
                  className="form-input"
                  value={authorName}
                  onChange={e => setAuthorName(e.target.value)}
                />
              </div>
            )}
            <div className="form-group">
              <textarea
                rows="2"
                placeholder="Ask about dimensions, pickup timing, or condition..."
                className="form-textarea"
                value={commentText}
                onChange={e => setCommentText(e.target.value)}
                required
              />
            </div>
            <button
              type="submit"
              className="submit-btn"
              disabled={submitting}
              style={{ width: 'auto', padding: '0.6rem 1.25rem', fontSize: '0.9rem' }}
            >
              {submitting ? 'Analyzing & Posting...' : 'Post Question'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
