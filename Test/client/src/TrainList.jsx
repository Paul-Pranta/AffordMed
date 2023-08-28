
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './TrainList.css'; // Import the CSS file

const TrainList = () => {
    const [trains, setTrains] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3000/api/trains') // Replace with your API endpoint
            .then(response => {
                setTrains(response.data.trains);
            })
            .catch(error => {
                console.error('Error fetching train data:', error);
            });
    }, []);

    return (
        <div className="train-list-container">
            <div className="train-list-header">Train Names:</div>
            <ul className="train-list">
                {trains.map(train => (
                    <li className="train-item" key={train.trainNumber}>
                        {/* Make each train name a link */}
                        <Link className="train-link" to={`/trains/${train.trainNumber}`}>{train.trainName}</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TrainList;



