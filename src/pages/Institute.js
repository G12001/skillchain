import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Table from "../components/Table";
import Navbar from "../components/Navbar";
import axios from "axios";
import Web3 from "web3";
import { abi } from "../utils";
import Modal from "../components/Modal";
import { AiOutlineLogout } from "react-icons/ai";
import Loader from "../components/Loader";
import Certicard from "../components/Certicard";

const InstituteRender = ({ color }) => {
  const [openTab, setOpenTab] = React.useState(1);
  const [isOpen, setIsOpen] = useState(false);
  const [loader, setLoader] = useState(false);
  const [certificates, setCertificates] = useState([]);
  const [companyData, setcompanyData] = useState(
    JSON.parse(localStorage.getItem("company"))
  );
  const [contract, setContract] = useState(null);
  const [myAccount, setMyAccount] = useState("");

  const [formData, setFormData] = useState({
    candidateName: "",
    companyId: companyData._id,
    companyName: companyData.companyName,
    course: "",
    duration: 0,
    date: new Date(),
  });
  const navigate = useNavigate();

  const isMetaMaskInstalled = () => {
    const { ethereum } = window;
    return Boolean(ethereum && ethereum.isMetaMask);
  };

  const ConnectWallet = async () => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    setMyAccount(account);
  };

  const initWeb3 = async () => {
    if (isMetaMaskInstalled() === true) {
      // Connect to the Ethereum (goerli) network

      const newWeb3 = new Web3(
        new Web3.providers.HttpProvider(
          "https://goerli.infura.io/v3/25e446fb272c4971aa6ea2912eb09e59"
        )
      );
      const ContractInstance = new newWeb3.eth.Contract(
        abi,
        "0x1BDb832D0960c42285B7777B20156aaaFe18a77c" //goerli contract address
      );
      setContract(ContractInstance);

      // Connect to the Ganache Test network

      const web3 = new Web3(
        new Web3.providers.HttpProvider("http://127.0.0.1:7545")
      );
      const RemixContract = new web3.eth.Contract(
        abi,
        "0x1BDb832D0960c42285B7777B20156aaaFe18a77c" // ganache contract  address
      );
      setContract(RemixContract);
    } else {
      alert(
        "Metamask Extension is Not installed!... We recommend you too install it first."
      );
      return;
    }
  };

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const checkAuth = () => {
    if (
      localStorage.getItem("company_token") === undefined ||
      localStorage.getItem("company_token") === null
    ) {
      navigate("/company_login");
    } else {
      return;
    }
  };

  const logOut = () => {
    localStorage.removeItem("company_token");
    localStorage.removeItem("company");
    alert("Logged Out Successfully!");
    navigate("/company_login");
  };

  const fetchCertificates = async () => {
    var companyId = companyData._id;
    if (!companyId) {
      alert("Error in loading company id!");
      return;
    }

    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/company/getcertificates",
        {
          companyId,
        }
      );

      const res = data.data;
      setCertificates(res.result);
    } catch (error) {
      console.error(error);
      alert(error.response.data);
    }
  };

  const fetchNextPage = async (e) => {
    var companyId = companyData._id;
    setLoader(true);
    const skip = e.target.value;
    if (!companyId) {
      alert("Error in loading company id!");
      return;
    }
    try {
      const data = await axios.post(
        "http://localhost:5000/api/v1/company/getcertificates",
        {
          companyId,
          skip,
        }
      );
      const res = data.data;
      setCertificates(res.result);
      setLoader(false);
    } catch (error) {
      console.error(error);
      setLoader(false);
      alert(error.response.data);
    }
  };

  const clearFields = () => {
    setFormData({
      candidateName: "",
      companyName: companyData.companyName,
      course: "",
      companyId: "",
      duration: "",
      date: new Date(),
    });
  };

  const createCert = async (event) => {
    event.preventDefault();
    const { candidateName, companyId, companyName, course, duration, date } =
      formData;

    if (
      !candidateName ||
      !companyName ||
      !companyId ||
      !course ||
      !duration ||
      !date
    ) {
      alert("All fields are compulsory");
      return;
    }
    setLoader(true);

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/company/create_cert",
        {
          candidateName,
          companyId,
          companyName,
          course,
          duration,
          date,
        }
      );
      alert("Certificate Created Successfully!");

      // publishing on blockchain
      const certificateParams = {
        _certificateID: response.data.result._id,
        _candidateName: response.data.result.candidateName,
        _companyName: response.data.result.companyName,
        _course: response.data.result.course,
        _date: Math.floor(Date.now() / 1000),
        _duration: response.data.result.duration,
      };

      const txReceipt = await contract.methods
        .generateCertificate(
          certificateParams._certificateID,
          certificateParams._candidateName,
          certificateParams._course,
          certificateParams._companyName,
          certificateParams._date,
          certificateParams._duration
        )
        .send({
          from: myAccount,
          gas: 300000,
        });
      const txn_hash = txReceipt.transactionHash;
      const cert_id = response.data.result._id;

      try {
        const data = await axios.put(
          "http://localhost:5000/api/v1/company/updatecert",
          {
            txn_hash,
            cert_id,
          }
        );
      } catch (error) {
        alert("Sorry! error in updating certificates.");
      }
      setLoader(false);
      alert("certificate created and published on blockchain successfully.");
      setFormData({
        candidateName: "",
        companyName: companyData.companyName,
        course: "",
        companyId: "",
        duration: "",
        date: new Date(),
      });

      fetchCertificates();
    } catch (error) {
      console.log(error);
      setLoader(false);
      alert("Error in publishing certificate on blockchain!");
    }
  };

  useEffect(() => {
    checkAuth();
    initWeb3();
    fetchCertificates();
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-wrap w-full bg-gradient-to-r from-cyan-500 to-blue-500">
        <div className="w-full">
          <ul
            className="flex mb-0 list-none flex-wrap mx-2 pt-3 pb-4 flex-row"
            role="tablist"
          >
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 1
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(1);
                }}
                data-toggle="tab"
                role="tablist"
              >
                Recently Generated Certificates
              </a>
            </li>
            <li className="-mb-px mr-2 last:mr-0 flex-auto text-center cursor-pointer">
              <a
                className={
                  "text-xs font-bold uppercase px-5 py-3 shadow-lg rounded block leading-normal " +
                  (openTab === 2
                    ? "text-white bg-" + color + "-600"
                    : "text-" + color + "-600 bg-white")
                }
                onClick={(e) => {
                  e.preventDefault();
                  setOpenTab(2);
                }}
                data-toggle="tab"
                role="tablist"
              >
                Generate Certificate
              </a>
            </li>
          </ul>
          <div className="relative flex flex-col min-w-0 break-words bg-gradient-to-r from-cyan-500 to-blue-500 w-full shadow-lg rounded">
            <div className="px-4 flex-auto">
              <div className="tab-content tab-space">
                <div className={openTab === 1 ? "block" : "hidden"} id="link1">
                  <Certicard certificates={certificates} />
                  <div className="mt-8 pl-8 mb-8">
                    <span className="text-white">Page No. :</span>
                    <button
                      onClick={fetchNextPage}
                      value="0"
                      className=" bg-gradient-to-r mb-1 from-green-300 via-blue-500 to-purple-600 text-white rounded-lg py-1 px-4 mx-4 font-semibold"
                    >
                      1
                    </button>
                    <button
                      onClick={fetchNextPage}
                      value="2"
                      className=" bg-gradient-to-r mb-1 from-green-300 via-blue-500 to-purple-600 text-white rounded-lg py-1 px-4 mx-4 font-semibold"
                    >
                      2
                    </button>
                    <button
                      onClick={fetchNextPage}
                      value="3"
                      className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white rounded-lg py-1 px-4 mx-4 font-semibold"
                    >
                      3
                    </button>
                    <button
                      onClick={fetchNextPage}
                      value="4"
                      className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white rounded-lg py-1 px-4 mx-4 font-semibold"
                    >
                      4
                    </button>
                    <button
                      onClick={fetchNextPage}
                      value="5"
                      className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white rounded-lg py-1 px-4 mx-4 font-semibold"
                    >
                      5
                    </button>
                  </div>
                </div>
                <div className={openTab === 2 ? "block" : "hidden"} id="link2">
                  <div className="bg-gray-100 flex flex-col border border-gray-900 rounded-lg mx-32 mt-8 pb-8 mb-12">
                    <p className="text-xl text-gray-600 font-bold m-4">
                      Account Address : {myAccount}
                      {myAccount ? (
                        <span className="bg-green-400 text-white py-2 px-2 rounded-lg ml-4">
                          Connected
                        </span>
                      ) : (
                        <button
                          onClick={ConnectWallet}
                          className="bg-blue-500 text-white py-2 px-2 rounded-lg "
                        >
                          Connect Wallet
                        </button>
                      )}
                    </p>
                    <p className="text-2xl text-gray-600 font-bold m-4">
                      Enter Candidate Details :{" "}
                    </p>
                    <form
                      className="flex flex-row flex-wrap mx-4"
                      onSubmit={createCert}
                    >
                      <input
                        type="text"
                        name="candidateName"
                        value={formData.candidateName}
                        onChange={handleChange}
                        placeholder="Candidate Name"
                        className="border rounded-lg py-3 px-3 w-2/5 m-4 ml-12 bg-gray-200 border-indigo-600 placeholder-gray-500 text-black"
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        name="course"
                        value={formData.course}
                        placeholder="Course Name"
                        className="border w-2/5 rounded-lg m-4 ml-12 px-3 bg-gray-200 border-indigo-600 placeholder-gray-500 text-black"
                      />
                      <input
                        type="text"
                        onChange={handleChange}
                        name="companyName"
                        value={formData.companyName}
                        placeholder="Company / Institute"
                        className="border w-2/5 rounded-lg py-3 px-3 ml-12 m-4 bg-gray-200 border-indigo-600 placeholder-gray-500 text-black"
                      />
                      <input
                        type="number"
                        onChange={handleChange}
                        name="duration"
                        value={formData.duration}
                        placeholder="Course Duration in months"
                        className="border w-2/5 rounded-lg py-3 px-3 m-4 ml-12 bg-gray-200 border-indigo-600 placeholder-gray-500 text-black"
                      />
                      <input
                        type="date"
                        onChange={handleChange}
                        name="date"
                        value={formData.date}
                        placeholder="Date of issue"
                        className="border rounded-lg py-3 w-2/5 px-3 m-4 ml-12 bg-gray-200 border-indigo-600 placeholder-gray-500 text-black"
                      />
                      {/* <button type="submit" className=" bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 text-white rounded-lg ml-4 px-8 font-semibold" >Create Certificates</button>
                                            <button type="submit" className="bg-teal-400 hover:bg-teat-600 text-white rounded-lg px-8 ml-4 font-semibold" >Clear</button> */}
                      <button
                        type="submit"
                        className=" px-8 font-bold text-xl text-white bg-purple-500 hover:bg-purple-600 m-4 ml-12 rounded-lg"
                      >
                        Create Certificate
                      </button>
                      <div
                        onClick={clearFields}
                        className=" px-12 pt-2 font-bold text-2xl cursor-pointer text-white bg-teal-400 hover:bg-teal-600 m-4 ml-6 rounded-lg"
                      >
                        Clear
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <AiOutlineLogout
          onClick={logOut}
          className="fixed bottom-8 right-8 text-red text-4xl cursor-pointer"
        />
      </div>
      {loader ? <Loader /> : <></>}
    </>
  );
};

export default function Institute() {
  return (
    <>
      <InstituteRender color="pink" />;
    </>
  );
}
