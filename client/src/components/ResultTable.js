import React, { useEffect, useState } from 'react';
import { getServerData } from '../helper/helper';

export default function ResultTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    getServerData(
      `${process.env.REACT_APP_SERVER_HOSTNAME}/api/result`,
      (res) => {
        setData(res);
      }
    );
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
          {data.map((v, i) => (
            <tr className="odd:bg-white text-center even:bg-gray-50" key={i}>
              <td className="px-6 py-3">{i}</td>
              <td className="px-6 py-3">{v?.user.name}</td>
              <td className="px-6 py-3">{v?.user.email}</td>
              <td className="px-6 py-3">{v?.questionsAttempted}</td>
              <td className="px-6 py-3">{v?.totalPoints}</td>
              <td className="px-6 py-3">{v?.points}</td>
              <td className="px-6 py-3">{v?.achived}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
