import React, { useState, useEffect, useCallback } from 'react';
import axios from 'axios';

function Miniproject1() {
  const [climateData, setClimateData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [availableDistricts, setAvailableDistricts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('./tn_weather_data.json');
        setClimateData(response.data);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    if (climateData) {
      const districtNames = climateData.districts.map((district) => ({
        name_en: district.name_en,
        name_ta: district.name_ta,
      }));
      setAvailableDistricts(districtNames);
    }
  }, [climateData]);

  const handleDistrictChange = useCallback((event) => {
    setSelectedDistrict(event.target.value);
    setSearchTerm('');
  }, []);

  const handleSearchChange = useCallback((event) => {
    setSearchTerm(event.target.value);
    setSelectedDistrict('');
  }, []);

  const filteredDistricts = availableDistricts.filter((district) =>
    district.name_en.toLowerCase().includes(searchTerm.toLowerCase()) ||
    district.name_ta.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayDistrict = selectedDistrict
    ? climateData?.districts.find((district) => district.name_en === selectedDistrict)
    : filteredDistricts.length === 1
    ? climateData?.districts[0]
    : null;

  return (
    <>
      <h1>Miniproject1 Weather App</h1>
      <div style={{textAlign:"center"}}>
        <select value={selectedDistrict} onChange={handleDistrictChange}>
          <option value="">மாவட்டத்தைத் தேர்ந்தெடுக்கவும்</option>
          {availableDistricts.map((district) => (
            <option key={district.name_en} value={district.name_en}>
              {district.name_en} / {district.name_ta}
            </option>
          ))}
        </select>

        <input
          type="text"
          placeholder="மாவட்டத்தைத் தேடவும்..."
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      {loading && <p>காலநிலை தரவைப் பதிவேற்றுகிறது...</p>}
      {error && <p>பிழை: {error.message || 'காலநிலை தரவைப் பதிவேற்ற முடியவில்லை'}</p>}

      {!loading && !error && (
        <>
          {availableDistricts.length > 0 && (
            <div>
              <p>
                கிடைக்கக்கூடிய மாவட்டங்கள்:
                {availableDistricts
                  .map((d) => `${d.name_en} (${d.name_ta})`)
                  .join(', ')}
              </p>
            </div>
          )}

          {displayDistrict && (
            <div>
              <h2>
                {displayDistrict.name_en} / {displayDistrict.name_ta}
              </h2>
              <p>சராசரி வெப்பநிலை: {displayDistrict.avg_temperature_celsius} °C</p>
              <p>சராசரி மழை அளவு: {displayDistrict.avg_rainfall_mm} மிமீ</p>
              <p>
                <strong>விளக்கம் (English):</strong> {displayDistrict.description_en}
              </p>
              <p>
                <strong>விளக்கம் (தமிழ்):</strong> {displayDistrict.description_ta}
              </p>
            </div>
          )}
          {!selectedDistrict && filteredDistricts.length !== 1 && (
            <div>
              <p>
                மேலே உள்ள பட்டியலில் இருந்து ஒரு மாவட்டத்தைத் தேர்ந்தெடுக்கவும் அல்லது தேடல் பெட்டியில் ஒரு மாவட்டத்தைத் தேடவும்.
              </p>
            </div>
          )}
        </>
      )}
      <style jsx>{`
        .district-card {
          border: 1px solid #ccc;
          padding: 16px;
          margin-bottom: 16px;
          border-radius: 8px;
          background-color: #f9f9f9;
        }
        h1 {
          font-size: 24px;
          margin-bottom: 20px;
          text-align: center;
        }
        select,
        input {
          padding: 10px;
          margin: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
          width: 250px;
          max-width: 100%;
        }
        .available-districts {
          margin-top: 20px;
          padding: 10px;
          background-color: #e0e0e0;
          border-radius: 8px;
        }
      `}</style>
    </>
  );
}

export default Miniproject1;
