import React, { useState, useEffect } from "react";

const Table = ({ certificates }) => {
  const [certi, setCerti] = useState([]);

  const helper = () => {
    setCerti(certificates);
  };

  useEffect(() => {
    helper();
  });

  return (
    <div className="flex flex-col mt-20">
      <div className="">
        <div className="p-1.5 w-full inline-block align-middle">
          <div className=" border rounded-lg">
            <table className="min-w-full divide-y divide-gray-200 ">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Certificate ID
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Candidate Name
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Course
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                  >
                    Duration
                  </th>
                  <th
                    scope="col"
                    className="px-3 py-3 text-xs font-bold text-center text-gray-500 uppercase "
                  >
                    Date
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y bg-white divide-gray-200">
                {certi.map((data) => {
                  return (
                    <tr key={data._id}>
                      <td className="px-3 py-4 text-sm font-medium text-blue-800 whitespace-nowrap">
                        {data._id}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {data.candidateName}
                      </td>
                      <td className="px-3 py-4 text-sm text-gray-800 whitespace-nowrap">
                        {data.course}
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-center whitespace-nowrap">
                        <a
                          className="text-green-500 hover:text-green-700"
                          href="#"
                        >
                          {data.duration}
                        </a>
                      </td>
                      <td className="px-3 py-4 text-sm font-medium text-right whitespace-nowrap">
                        <a className="text-red-500 hover:text-red-700" href="#">
                          {data.date.slice(0, 10)}
                        </a>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
