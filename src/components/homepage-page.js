import React, { useEffect, useState } from "react";
import axios from "axios";

const Homepage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    return date.toLocaleDateString("en-EN", optionsDate); // Sadece tarih
  };

  const formatTime = (timeString) => {
    const [hours, minutes] = timeString.split(":").map(Number);

    const isAM = hours < 12;
    const formattedHours = hours % 12 || 12; // 0 saatini 12 olarak göster
    const formattedMinutes = minutes.toString().padStart(2, "0"); // Dakikaları iki basamaklı yap

    return `${formattedHours}:${formattedMinutes} ${isAM ? "AM" : "PM"}`;
  };

  // Kullanım
  const timeStr = "00:05:00";
  console.log(formatTime(timeStr));

  const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const optionsDate = {
      year: "numeric",
      month: "long",
      day: "numeric",
    };

    const optionsTime = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    };

    const formattedDate = date.toLocaleDateString("en-US", optionsDate);
    const formattedTime = date.toLocaleTimeString("en-US", optionsTime);

    return `${formattedDate} ${formattedTime}`; // Hem tarih hem zaman
  };
  useEffect(() => {
    const fetchData = async (airline) => {
      try {
        const response = await axios.get(
          `https://api.schiphol.nl/public-flights/flights`,
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

    fetchData("FAO");
  }, []);

  if (loading) return <div>Yükleniyor...</div>;
  if (error) return <div>Hata: {error}</div>;

  return (
    <div>
      <h1>Schiphol Uçuş Verileri</h1>
      <div className="flex justify-start p-3">
        <div className="grid grid-cols-1 gap-4 w-3/4">
          {data.map((flight) => (
            <div className="bg-gray-200">
              <p className="p-2 flex justify-start  rounded">
                {flight.flightName}
              </p>
              <p className="p-2 flex justify-start rounded">
                {formatDate(flight.scheduleDate)}
              </p>
              <p className="p-2 flex justify-start rounded">
                {flight.flightDirection}
              </p>

              <p className="p-2 flex justify-start rounded">
                {flight.airlineCode}
              </p>
              <p className="p-2 flex justify-start rounded">
                {formatTime(flight.scheduleTime)}
              </p>
              <p className="p-2 flex justify-start rounded">
                {formatDateTime(flight.lastUpdatedAt)}
              </p>
            </div>
          ))}
          <button>selm</button>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
