const express = require("express");
const bcrypt = require("bcrypt");
const CertificateModal = require("../modals/CertificateModal");
const jwt = require("jsonwebtoken");

const router = express.Router();
const secret = "jfhdhegtuiheiu";
const CompanyModal = require("../modals/CompanyModal");

router.post("/login", (req, res) => {
  const { email, password } = req.body;

  // Check if email exists in database
  CompanyModal.findOne({ email }, (err, company) => {
    if (err) return res.status(500).send("Error logging in");
    if (!company) return res.status(400).send("User not found");
    // Compare the passwords
    bcrypt.compare(password, company.password, (err, isMatch) => {
      if (err) return res.status(500).send("Error logging in");
      if (!isMatch) return res.status(400).send("Invalid password");

      // Create JWT Token
      // jwt.sign(company,secret,{expireIn:"500s"},(err,token)=>{
      //    if(err){
      //       res.send("error in generating jwt");
      //    }else{
      //     res.send({ token ,company });
      //    }
      // })

      const token = jwt.sign({ company }, secret, {
        algorithm: "HS256",
      });

      res.send({ company, token });
    });
  });
});

router.post("/create_cert", async (req, res) => {
  try {
    // Create a new cert
    const newcCertificate = new CertificateModal({
      candidateName: req.body.candidateName,
      companyId: req.body.companyId,
      companyName: req.body.companyName,
      course: req.body.course,
      duration: req.body.duration,
      date: req.body.date,
      cert_txn: req.body.cert_txn,
    });

    // Save the admin to the database
    const result = await newcCertificate.save();

    // Return a success message
    res.send({ message: "certificate created successfully", result });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.post("/getcertificates", async (req, res) => {
  const c_id = req.body.companyId;
  const skip = req.body.skip;
  try {
    CertificateModal.find({ companyId: c_id })
      .limit(6)
      .skip(skip * 2 || 0)
      .exec((err, result) => {
        if (err) return res.status(500).send("Error in fetching certificates.");
        if (result.length === 0)
          return res.status(400).send("No certificate created yet.");
        res.send({ result });
      });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.put("/updatecert", async (req, res) => {
  try {
    CertificateModal.updateOne(
      { _id: req.body.cert_id },
      { $set: { cert_txn: req.body.txn_hash } },
      (err, result) => {
        if (err)
          return res.status(500).send("error in fetching certificates..");
        if (!result) return res.status(400).send("No certificate found.");
        res.send({ result });
      }
    );
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

module.exports = router;
