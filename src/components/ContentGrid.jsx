import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentCard from './ContentCard';
import InfiniteScroll from 'react-infinite-scroll-component';

const PAGE_SIZE = 12;

function filterItems(items, pricing, keyword) {
  let filtered = items;
  if (pricing.length) {
    filtered = filtered.filter((item) => pricing.includes(item.pricingOption));
  }
  if (keyword) {
    const kw = keyword?.toLowerCase();
    filtered = filtered?.filter(
      (item) =>
        item?.title?.toLowerCase()?.includes(kw) ||
        item?.creator?.toLowerCase()?.includes(kw)
    );
  }
  return filtered;
}

export default function ContentGrid() {
  const { items, status } = useSelector((state) => state.content);
  const { pricing, keyword } = useSelector((state) => state.filter);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = filterItems(items, pricing, keyword);

  const fetchMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  if (status === 'loading') return <div>Loading...</div>;
  if (status === 'failed') return <div>Error loading data.</div>;

  return (
    <InfiniteScroll
      dataLength={Math.min(visibleCount, filtered.length)}
      next={fetchMore}
      hasMore={visibleCount < filtered.length}
      loader={<h4>Loading...</h4>}
    >
      <div className="content-grid">
        {filtered.slice(0, visibleCount).map((item) => (
          <ContentCard key={item.id} item={item} />
        ))}
      </div>
    </InfiniteScroll>
  );
} 