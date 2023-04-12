pragma solidity ^0.8.0;

// SPDX-License-Identifier: GPL-3.0

contract CertificateGeneration {
    struct Certificate {
        string certificateID;
        string candidateName;
        string companyName;
        string course;
        uint256 date;
        uint256 duration;
        bool isValid;
    }

    mapping(string => Certificate) public certificates;

    function generateCertificate(
        string memory _certificateID,
        string memory _candidateName,
        string memory _companyName,
        string memory _course,
        uint256 _date,
        uint256 _duration
    ) public {
        certificates[_certificateID] = Certificate(
            _certificateID,
            _candidateName,
            _companyName,
            _course,
            _date,
            _duration,
            true
        );
    }

    function validateCertificate(
        string memory _certificateID
    ) public view returns (bool) {
        return certificates[_certificateID].isValid;
    }

    function invalidateCertificate(string memory certificateID) public {
        certificates[certificateID].isValid = false;
    }

    function getData(
        string memory _certificateID
    )
        public
        view
        returns (
            string memory candidateName,
            string memory _companyName,
            string memory course,
            uint256 date,
            uint256 duration,
            bool isValid
        )
    {
        Certificate memory certificate = certificates[_certificateID];
        return (
            certificate.candidateName,
            certificate.companyName,
            certificate.course,
            certificate.date,
            certificate.duration,
            certificate.isValid
        );
    }
}
