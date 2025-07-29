import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ContentCard from './ContentCard';
import InfiniteScroll from 'react-infinite-scroll-component';
import { Sort } from './Sort';

const PAGE_SIZE = 12;

function filterItems(items, pricing, keyword, priceRange) {
  let filtered = items;
  
  // Price range filtering
  if (priceRange === 0) {
    // At slider position 0: show only free and view-only content
    filtered = filtered.filter((item) => 
      item.price === 0 || // paid
      item.pricingOption === 1 || // Free
      item.pricingOption === 2    // view only
    );
  } else {
    // Above 0: show content up to the price range
    filtered = filtered.filter((item) => item.price <= priceRange);
  }
  
  // Pricing option filtering (if still using checkboxes)
  if (pricing.length) {
    filtered = filtered.filter((item) => pricing.includes(item.pricingOption));
  }
  
  // Keyword filtering
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

function sortItems(items, sortBy) {
  // Partition
  const paidItems     = items.filter(i => i.pricingOption === 0);
  const freeItems     = items.filter(i => i.pricingOption === 1);
  const viewOnlyItems = items.filter(i => i.pricingOption === 2);

  switch (sortBy) {
    case 'high':
      // paid desc, then free, then view-only
      paidItems.sort((a, b) => (b.price || 0) - (a.price || 0));
      return [...paidItems, ...freeItems, ...viewOnlyItems];

    case 'low':
      // view-only, then free, then paid asc
      paidItems.sort((a, b) => (a.price || 0) - (b.price || 0));
      return [...viewOnlyItems, ...freeItems, ...paidItems];

    case 'name':
      return [...items].sort((a, b) =>
        (a.title || '').localeCompare(b.title || '')
      );

    case 'relevance':
    default:
      return items; // original order
  }
}


export default function ContentGrid() {
  const { items, status } = useSelector((state) => state.content);
  const { pricing, keyword, priceRange, sortBy } = useSelector((state) => state.filter);
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  // Apply filters first, then sorting
  const filtered = filterItems(items, pricing, keyword, priceRange || 0);
  const sortedAndFiltered = sortItems(filtered, sortBy);

  const fetchMore = () => setVisibleCount((c) => c + PAGE_SIZE);

  if (status === 'loading') return <div className="loader">Loading...</div>;
  if (status === 'failed') return <div>Error loading data.</div>;

  return (
    <>
      <Sort />
      <InfiniteScroll
        dataLength={Math.min(visibleCount, sortedAndFiltered.length)}
        next={fetchMore}
        hasMore={visibleCount < sortedAndFiltered.length}
        loader={<h4>Loading...</h4>}
      >
        <div className="content-grid">
          {sortedAndFiltered.slice(0, visibleCount).map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      </InfiniteScroll>
    </>
  );
}
