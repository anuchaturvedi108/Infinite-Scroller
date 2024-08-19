import React, { useState, useEffect, useRef } from 'react';

const InfiniteScroll = ({ children, fetchMore, loadingComponent }) => {
  const [isFetching, setIsFetching] = useState(false);
  const observer = useRef();

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    // we initialize an IntersectionObserver to detect when the watcher element comes into view. We configure the observer with options such as root, rootMargin, and threshold. Here, we're observing when the watcher element is fully in view (threshold: 1.0).

    observer.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !isFetching) {
          setIsFetching(true);
          fetchMore().then(() => {
            setIsFetching(false);
          });
        }
      });
    }, options);

    // The observer triggers when the watcher element intersects with the viewport and isFetching is false, preventing multiple simultaneous fetches. It then calls the fetchMore function to load additional content. We update the state to indicate that we are fetching data (setIsFetching(true)) and reset it once fetching is complete.

    if (observer.current) {
      observer.current.observe(document.getElementById('watcher'));
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [fetchMore, isFetching]);

  return (
    <div>
      {children}
      {/* We observe the watcher element using the observe method of the IntersectionObserver instance. Additionally, we define a cleanup function in the useEffect hook's return statement to disconnect the observer when the component unmounts, preventing any potential memory leaks. */}
      <div id="watcher" style={{ height: '10px' }}></div>
      {isFetching && loadingComponent}
    </div>
  );
};

export default InfiniteScroll;
