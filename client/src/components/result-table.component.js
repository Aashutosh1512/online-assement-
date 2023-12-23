import axios from 'axios';
import React, { useEffect, useState } from 'react';

export default function ResultTable() {
  const [results, setResults] = useState([]);

  useEffect(() => {
    const fetchResults = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`
      );

      setResults(res.data);
    };

    fetchResults();
  }, []);

  return (
    <div>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
          <tr className="text-center">
            <th className="px-6 py-3">S.no.</th>
            <th className="px-6 py-3">Name</th>
            <th className="px-6 py-3">Email</th>
            <th className="px-6 py-3">Attemps</th>
            <th className="px-6 py-3">Total Points</th>
            <th className="px-6 py-3">Points</th>
            <th className="px-6 py-3">Result</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, idx) => (
            <tr className="odd:bg-white text-center even:bg-gray-50" key={idx}>
              <td className="px-6 py-3">{idx}</td>
              <td className="px-6 py-3">{result?.user.name}</td>
              <td className="px-6 py-3">{result?.user.email}</td>
              <td className="px-6 py-3">{result?.questionsAttempted}</td>
              <td className="px-6 py-3">{result?.totalPoints}</td>
              <td className="px-6 py-3">{result?.points}</td>
              <td className="px-6 py-3">{result?.achived}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
