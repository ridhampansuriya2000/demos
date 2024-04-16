let express = require("express");
let app = express();
let ejs = require("ejs");
const puppeteer = require('puppeteer');
const path = require("path");
const mjml2html = require("mjml");
const fs = require("fs");
const htmlToImage = require('html-to-image');
const { jsPDF } = require('jspdf');

app.use(express.static(path.join(__dirname, "public")));

// Define your chart data
const chartData1 = {
	labels: ['2012', '2013', '2014', '2015', '2016', '2017'],
	label: 'No of Votes',
	data: [12, 19, 3, 5, 2, 3]
};

const chartData = {
	labels: ['2012', '2013', '2014', '2015', '2016', '2017', '2018'],
	datasets: [{
		label: 'No of Votes',
		data: [65, 59, 80, 81, 56, 55, 40],
		fill: false,
		borderColor: 'rgb(75, 192, 192)',
		tension: 0.1
	}]
};

app.get("/generateReport", async (req, res) => {
	const browser = await puppeteer.launch({
		headless: false,
	});
	const html = await ejs.renderFile('views/report-template.ejs', chartData);
	const page = await browser.newPage();
	await page.setContent(html, { waitUntil: "domcontentloaded" });

	const pdfBuffer = await page.pdf({format: 'A4'});
	// const fileStream = await page.pdf({
	// 	displayHeaderFooter: true,
	// 	footerTemplate:
	// 		'<div class="footer" style="font-size: 10px;color: #000; margin: 10px auto;clear:both; position: relative;"><span class="pageNumber"></span></div>',
	// 	margin: {top :30,bottom: 50},
	// });

	await browser.close();

	res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
	res.setHeader("Content-Type", "application/pdf");
	res.send(pdfBuffer);
});

app.get("/generatePDF2", async (req, res) => {
	try {
		const mjmlTemplatePath = path.join(__dirname, "templates", "report.mjml");
		// const mjmlTemplate = fs.readFileSync(__dirname + "/templates/report.mjml", "utf-8");
		// Compile MJML to HTML
		const mjmlTemplate = `
      <mjml>
        ${fs.readFileSync(mjmlTemplatePath, "utf-8")}
      </mjml>`;
		const { html } = mjml2html(mjmlTemplate);

		// Launch Puppeteer
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Set content and generate PDF
		await page.setContent(html);
		const pdfBuffer = await page.pdf({ format: "A4" });

		// Close the browser
		await browser.close();

		// Set headers for file download
		res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
		res.setHeader("Content-Type", "application/pdf");

		// Send the PDF as a response
		res.send(pdfBuffer);
	} catch (error) {
		console.error("Error generating PDF:", error);
		res.status(500).send("Error generating PDF");
	}
});

app.get("/test",async (req, res) => {
	// res.render("report-template.ejs",chartData);

	try {
		// Render the EJS template to HTML
		const html = await ejs.renderFile('views/report-template.ejs', chartData);

		// Launch Puppeteer and create a new page
		const browser = await puppeteer.launch();
		const page = await browser.newPage();

		// Set a large viewport to capture the entire page
		await page.setViewport({ width: 1200, height: 800 });

		// Set the content of the page to the rendered HTML
		await page.setContent(html, { waitUntil: "domcontentloaded" });

		// Capture a full-page screenshot
		const screenshot = await page.screenshot({ fullPage: true });

		// Close the browser
		await browser.close();

		// Save the screenshot as an image file (optional)
		fs.writeFileSync('screenshot.png', screenshot);

		// Now, you can embed the image into a PDF or send it as a response to the client
		// For embedding into a PDF, you can use a PDF library like jsPDF

		// Send the image as a response (optional)
		res.setHeader('Content-Type', 'image/png');
		res.status(200).end(screenshot);
		// Convert the screenshot (PNG format) to PDF using jsPDF

	} catch (e) {
		res.status(500).send({ error: e.message });
	}
});

app.listen(5000, () => {
	console.log('Server Is running At 5000');
});
