import React, { use, useState } from "react";
import PinCodeData from "./components/PinCodeData";

function App() {
  const [pincode, setPincode] = useState("");
  const [pincodeData, setPincodeData] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading]=  useState(false);

  const fetchPincode = async () => {
    if (!pincode) {
      alert("Please enter a pincode"); // Alert for empty input
      return;
    }
    if (pincode.length !== 6 || isNaN(pincode)) {
      alert("Enter a valid 6-digit pincode"); // Alert for invalid format
      return;
    }
    setLoading(true);

    try {
      const response = await fetch(`https://api.postalpincode.in/pincode/${pincode}`);
      const data = await response.json();

      if (data && data[0].Status === "Success") {
        setPincodeData(data);
        setError("");
      } else {
        setError("Invalid pincode, please try again");
        setPincodeData([]);
      }
    } catch (e) {
      console.error(e);
      setError("Something went wrong, try again later");
    } finally{
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 p-8">
      {/* Pincode Input */}
      <div className="flex flex-col items-center font-serif">
        <h1 className="text-3xl font-bold text-white py-4">Enter Pincode</h1>
        <div className="flex space-x-3">
          <input
            type="text"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            placeholder="Enter 6-digit pincode"
            maxLength="6"
            className="bg-white/80 text-gray-800 px-4 py-3 rounded-lg shadow-lg w-64 text-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-300"
          />
          <button
            onClick={fetchPincode}
            disabled={loading}
            className="bg-blue-600 text-white px-5 py-3 rounded-lg shadow-md hover:bg-blue-800 transition-all hover:underline"
          >
            {loading ? "Fetching...":"Search"}
            
          </button>
        </div>
      </div>

      {/* Error Message */}
      {error && <p className="mt-4 text-orange-400 font-bold">{error}</p>}

      {/* Pincode Data Table */}
      <div className="mt-8 w-full max-w-4xl">
        <table className="w-full border border-collapse border-gray-300 bg-white/90 shadow-lg rounded-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="p-3 text-red-300 hover:bg-gray-600 hover:underline">Name</th>
              <th className="p-3 text-blue-300 hover:bg-gray-600 hover:underline">Pincode</th>
              <th className="p-3 text-green-300 hover:bg-gray-600 hover:underline">District</th>
              <th className="p-3 text-yellow-300 hover:bg-gray-600 hover:underline">State</th>
              <th className="p-3 text-purple-300 hover:bg-gray-600 hover:underline">Country</th>
            </tr>
          </thead>
          <tbody>
            <PinCodeData pincodeData={pincodeData} />
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
