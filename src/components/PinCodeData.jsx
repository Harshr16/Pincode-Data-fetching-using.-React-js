import React from "react";

const PinCodeData = ({ pincodeData }) => {
  return (
    <>
      {pincodeData.map((curData, index) => {
        if (curData.Status === "Success" && curData.PostOffice) {
          return curData.PostOffice.map((office, idx) => (
            <tr key={`${index}-${idx}`} className="hover:bg-gray-200 transition-all">
              <td className="border p-3 text-red-500 font-semibold">{office.Name}</td>
              <td className="border p-3 text-blue-500 font-semibold">{office.Pincode}</td>
              <td className="border p-3 text-green-500 font-semibold">{office.District}</td>
              <td className="border p-3 text-yellow-500 font-semibold">{office.State}</td>
              <td className="border p-3 text-purple-500 font-semibold">{office.Country}</td>
            </tr>
          ));
        } else {
          return (
            <tr key={index}>
              <td colSpan="5" className="border p-4 text-center text-red-600 font-bold">
                No Data Found
              </td>
            </tr>
          );
        }
      })}
    </>
  );
};

export default PinCodeData;
