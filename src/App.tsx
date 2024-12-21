import React, { useState, useEffect } from 'react';

interface HeartRateData {
  id: number;
  heartRate: number;
  timestamp: string;
}

const initialHeartRateData: HeartRateData[] = [
  { id: 1, heartRate: 70, timestamp: '2023-01-01 12:00:00' },
  { id: 2, heartRate: 80, timestamp: '2023-01-01 13:00:00' },
  { id: 3, heartRate: 90, timestamp: '2023-01-01 14:00:00' },
];

const HeartRateMonitor = () => {
  const [heartRate, setHeartRate] = useState(0);
  const [sosSignal, setSosSignal] = useState(false);
  const [beepSound, setBeepSound] = useState(false);
  const [heartRateData, setHeartRateData] = useState(initialHeartRateData);
  const [averageHeartRate, setAverageHeartRate] = useState(0);
  const [maxHeartRate, setMaxHeartRate] = useState(0);
  const [minHeartRate, setMinHeartRate] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      const randomHeartRate = Math.floor(Math.random() * 150);
      setHeartRate(randomHeartRate);
      if (randomHeartRate > 90 || randomHeartRate < 60) {
        setSosSignal(true);
        setBeepSound(true);
        const audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
        audio.play();
      } else {
        setSosSignal(false);
        setBeepSound(false);
      }
      const newHeartRateData: HeartRateData = {
        id: heartRateData.length + 1,
        heartRate: randomHeartRate,
        timestamp: new Date().toISOString().replace('T', ' ').slice(0, 19),
      };
      setHeartRateData([...heartRateData, newHeartRateData]);
      const totalHeartRate = heartRateData.reduce((acc, current) => acc + current.heartRate, 0);
      setAverageHeartRate(totalHeartRate / heartRateData.length);
      setMaxHeartRate(Math.max(...heartRateData.map(data => data.heartRate)));
      setMinHeartRate(Math.min(...heartRateData.map(data => data.heartRate)));
    }, 1000);
    return () => clearInterval(intervalId);
  }, [heartRateData]);

  const handleSosSignal = () => {
    setSosSignal(false);
    setBeepSound(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-md">
      <h1 className="text-4xl font-bold mb-8 text-center">Heart Rate Monitor</h1>
      <div className="flex justify-between mb-8">
        <div className="bg-gray-200 border-2 border-dashed rounded-xl w-24 h-24 flex justify-center items-center">
          <p className="text-3xl font-bold">{heartRate} bpm</p>
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="text-2xl font-bold mb-4">Heart Rate Statistics</p>
          <div className="flex justify-between mb-4">
            <p className="text-lg font-bold">Average Heart Rate:</p>
            <p className="text-lg font-bold">{averageHeartRate.toFixed(2)} bpm</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg font-bold">Max Heart Rate:</p>
            <p className="text-lg font-bold">{maxHeartRate} bpm</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-lg font-bold">Min Heart Rate:</p>
            <p className="text-lg font-bold">{minHeartRate} bpm</p>
          </div>
        </div>
      </div>
      {sosSignal && (
        <div className="bg-red-500 text-white p-4 rounded-lg mb-8">
          <p className="text-lg font-bold">SOS Signal!</p>
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={handleSosSignal}
          >
            Dismiss
          </button>
        </div>
      )}
      <h2 className="text-3xl font-bold mb-4">Heart Rate Database</h2>
      <table className="table-auto w-full mb-8">
        <thead>
          <tr>
            <th className="px-4 py-2">ID</th>
            <th className="px-4 py-2">Heart Rate</th>
            <th className="px-4 py-2">Timestamp</th>
          </tr>
        </thead>
        <tbody>
          {heartRateData.map((data) => (
            <tr key={data.id}>
              <td className="px-4 py-2">{data.id}</td>
              <td className="px-4 py-2">{data.heartRate} bpm</td>
              <td className="px-4 py-2">{data.timestamp}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        onClick={() => setHeartRate(0)}
      >
        Reset
      </button>
    </div>
  );
};

export default HeartRateMonitor;