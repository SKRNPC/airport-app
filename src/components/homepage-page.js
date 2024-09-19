import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.schiphol.nl/public-flights/flights",
          {
            headers: {
              Accept: "application/json",
              app_id: "9c5d081b",
              app_key: "81e33ed31f692cf98c8153835db9f30e",
              ResourceVersion: "v4",
            },
          }
        );
        setData(response.data.flights);
        console.log(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>Schiphol Uçuş Verileri</h1>
      <ul>
        {data.map((flight) => (
          <p>{flight.id}</p>
        ))}
      </ul>
    </div>
  );
};

export default Homepage;
