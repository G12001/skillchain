import React, { useState, useEffect } from "react";
import Modal from "./Modal";

const Certicard = ({ certificates }) => {
  const [certi, setCerti] = useState([]);
  const [modal, setModal] = useState(false);
  const [currentCert, setcurrentCert] = useState();

  const View = (data) => {
    setModal((modal) => !modal);
    setcurrentCert(data);
  };
  useEffect(() => {
    setCerti(certificates);
  });

  return (
    <div className="grid grid-cols-3 gap-4 mx-8 mt-4">
      {certi.map((data) => {
        return (
          <div
            key={data._id}
            className="block cursor-pointer rounded-xl bg-gray-100 border border-gray-800 p-4 shadow-xl transition hover:border-pink-500/10 hover:shadow-pink-500/10"
          >
            <h2 className="mb-4 text-xl font-bold text-center text-black">
              {" "}
              {data.candidateName}
            </h2>

            <p className="mt-1 text-sm text-black pl-1">
              Certificate Id : {data._id}
            </p>
            <p className="mt-1 text-sm text-black pl-1">
              Course / Program : {data.course}
            </p>
            <div
              className="text-white font-bold bg-blue-400 py-2 text-center my-2 rounded-md"
              onClick={() => View(data)}
            >
              View
            </div>
          </div>
        );
      })}
      {modal ? (
        <>
          <Modal
            isOpen={modal}
            setIsOpen={setModal}
            currentCert={currentCert}
          />
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default Certicard;
