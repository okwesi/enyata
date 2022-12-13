const express = require("express");
const pool = require("../database");
const request = require("request");
const queries = require("./queries");
require("dotenv").config()


const API_key = process.env.API_key;

const getReports = async (req, res) => {

  pool.query(queries.getReports, (error, results) =>{
    if(error) return res.status(400).json(error);
    res.status(200).json(results.rows)
  })
};

const getReport = async (req, res) => {
  const {id} = req.params
  pool.query(queries.getReport, [id], (error, results) =>{
    if(error) return res.status(400).json(error);
    if(results.rows.length === 0 ) return res.status(404).json({message:"Report Not Found"})
    res.status(200).json(results.rows)
  })
};

const createReport = async (req, res) => {
  
  const { client_id, incident_desc, city, country } = req.body;
  const options = {
    method: "GET",
    url: `https://api.openweathermap.org/data/2.5/weather?q=${city},${country}&appid=${API_key}`,
  };

  await request(options, function (error, response, body) {

    if (error) return res.json(error);
    const weather_report = JSON.parse(body);
    if (weather_report.cod !== 200) return res.status(400).json(weather_report)
    pool.query(queries.createReport, [incident_desc, city, country, weather_report, client_id], (error, results) => {

      if (error) {
        return res.status(401).json(error)
      }
      res.status(201).json({
        message : "Report Created",
        data : results.rows
      })

    })

  });
};



module.exports = {
  getReports,
  getReport,
  createReport,
};


