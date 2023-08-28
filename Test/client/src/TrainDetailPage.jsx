
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './TrainDetailPage.css'; // Import the CSS file

const TrainDetailPage = () => {
  const { trainNumber } = useParams();
  const [trainDetails, setTrainDetails] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:3000/api/trains/${trainNumber}`)
      .then(response => {
        setTrainDetails(response.data);
      })
      .catch(error => {
        console.error('Error fetching train details:', error);
      });
  }, [trainNumber]);

  if (!trainDetails) {
    return <div>Loading...</div>;
  }

  return (
    <div className="train-details-container">
      <div className="train-details-header">Train Details</div>
      <div className="train-details-content">
        <p>Train Name: {trainDetails.trainName}</p>
        <p>Train Number: {trainDetails.trainNumber}</p>
        <p>Departure Time: {trainDetails.departureTime.Hours}:{trainDetails.departureTime.Minutes}:{trainDetails.departureTime.Seconds}</p>
        <p>Seats Available:</p>
        <ul className="train-details-list">
          <li className="train-details-item">Sleeper: {trainDetails.seatsAvailable.sleeper}</li>
          <li className="train-details-item">AC: {trainDetails.seatsAvailable.AC}</li>
        </ul>
        <p>Price:</p>
        <ul className="train-details-list">
          <li className="train-details-item">Sleeper: {trainDetails.price.sleeper}</li>
          <li className="train-details-item">AC: {trainDetails.price.AC}</li>
        </ul>
        <p>Delayed By: {trainDetails.delayedBy} minutes</p>
      </div>
    </div>
  );
};

export default TrainDetailPage;

