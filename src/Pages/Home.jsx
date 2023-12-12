import React, { useState, useEffect } from 'react';
import "./Home.css"
import { Link } from 'react-router-dom';

const Home = () => {
  const [recordCount, setRecordCount] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://react-solo-project-2-default-rtdb.firebaseio.com//formData.json");
        const data = await response.json();

        if (data) {
          const count = Object.keys(data).length;
          setRecordCount(count);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <main>
      <div className="container">
        <div className="row-1">
          <h2>Number of Records :</h2>
          <input 
            type="text"
            readOnly={true}
            value={recordCount}
          />                
        </div>
        <div className="row-2">
          <Link to="/CreateRecord">Create Record</Link>
          <Link to="/ViewRecord">View Record</Link>
        </div>
      </div>
    </main>
  );
};

export default Home;
