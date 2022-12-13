createReport = 'INSERT INTO public."Report"(incident_desc, city, country, weather_report, client_id) VALUES ($1, $2,$3, $4, $5) RETURNING *; '
getReports = 'SELECT id, incident_desc, city, country, date, weather_report, client_id FROM public."Report";'
getReport = 'SELECT * FROM public."Report" where id=$1;'
module.exports = {
    createReport,
    getReports,
    getReport
}