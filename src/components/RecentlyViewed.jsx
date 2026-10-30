import { Link } from "react-router";

function RecentlyViewed({ recentlyViewed, clearRecentlyViewed }) {
  return (
    <section>
      <h2 className="section-title">Recently Viewed</h2>

      {recentlyViewed.length === 0 ? (
        <p>No recently viewed items yet.</p>
      ) : (
        <>
          <div className="grid">
            {recentlyViewed.map((entry) => (
              <div className="card" key={`${entry.vendorId}-${entry.itemId}`}>
                <h3>
                  <Link to={`/vendor/${entry.vendorId}`}>{entry.itemName}</Link>
                </h3>

                <p className="muted">From: {entry.vendorName}</p>
              </div>
            ))}
          </div>

          <button type="button" onClick={clearRecentlyViewed}>
            Clear History
          </button>
        </>
      )}
    </section>
  );
}

export default RecentlyViewed;
