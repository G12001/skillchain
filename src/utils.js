export const abi = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateID",
        type: "string",
      },
      {
        internalType: "string",
        name: "_candidateName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_course",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "_date",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "_duration",
        type: "uint256",
      },
    ],
    name: "generateCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "certificateID",
        type: "string",
      },
    ],
    name: "invalidateCertificate",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    name: "certificates",
    outputs: [
      {
        internalType: "string",
        name: "certificateID",
        type: "string",
      },
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
      {
        internalType: "string",
        name: "companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "course",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateID",
        type: "string",
      },
    ],
    name: "getData",
    outputs: [
      {
        internalType: "string",
        name: "candidateName",
        type: "string",
      },
      {
        internalType: "string",
        name: "_companyName",
        type: "string",
      },
      {
        internalType: "string",
        name: "course",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "date",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "duration",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isValid",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "_certificateID",
        type: "string",
      },
    ],
    name: "validateCertificate",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
