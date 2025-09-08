const values = [
  {
    icon: '🚚',
    title: 'Free Delivery',
    description: 'Enjoy fast, free delivery on all orders nationwide.',
  },
  {
    icon: '🔄',
    title: '30-Day Returns',
    description: 'Not satisfied? Return your items within 30 days.',
  },
  {
    icon: '✅',
    title: 'Quality Guarantee',
    description: 'We stand by the craftsmanship of every piece.',
  },
  {
    icon: '🌿',
    title: 'Eco-Friendly',
    description: 'Sustainable materials and responsible sourcing.',
  },
];

function ValueProps() {
  return (
    <section className="value-section">
      <div className="value-container">
        <h2 className="value-title">Why Shop With Us</h2>
        <div className="value-grid">
          {values.map((item, index) => (
            <div key={index} className="value-card">
              <div className="value-icon">{item.icon}</div>
              <h3 className="value-heading">{item.title}</h3>
              <p className="value-description">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ValueProps;