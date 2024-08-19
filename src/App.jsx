import React, { useState } from 'react';
import InfiniteScroll from './InfiniteScroll'; // Importing the InfiniteScroll component

export default function App() {
  const [items, setItems] = useState([]);

  // Function to fetch more data
  const fetchMoreData = () => {
    // Simulating fetching more data, you should replace this with your actual fetching logic
    return new Promise((resolve) => {
      setTimeout(() => {
        const newItems = Array.from(
          { length: 10 },
          (_, index) => items.length + index + 1
        );
        setItems((prevItems) => [...prevItems, ...newItems]);
        resolve();
      }, 1000);
    });
  };

  // Loading component to be displayed while fetching data
  const loadingComponent = <div>Loading...</div>;

  return (
    <div className="App">
      {/* Integration of InfiniteScroll component */}
      <InfiniteScroll
        fetchMore={fetchMoreData}
        loadingComponent={loadingComponent}
      >
        {/* Rendering the list of items */}
        {items.map((item) => (
          <div
            key={item}
            style={{
              border: '1px solid black',
              padding: '10px',
              margin: '5px',
            }}
          >
            Item Component {item}
          </div>
        ))}
      </InfiniteScroll>
    </div>
  );
}
