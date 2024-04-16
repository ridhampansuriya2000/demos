const express = require('express');
const app = express();
const ejs = require('ejs');
const puppeteer = require('puppeteer');


// Define your chart data (you can replace this with your own data)
const chartData = {
    chartType: 'bar',
    chartLabel: 'Sample Data',
    labels: ['January', 'February', 'March', 'April', 'May'],
    data: [12, 19, 3, 5, 2],
    backgroundColor: 'rgba(75, 192, 192, 0.2)',
    borderColor: 'rgba(75, 192, 192, 1)',
};



exports.PdfGenerator = async (req, res) => {
    try {
        const browser = await puppeteer.launch({
            headless: 'true',
            // `headless: true` (default) enables old Headless;
            // `headless: 'new'` enables new Headless;
            // `headless: false` enables “headful” mode.
        });
        const page = await browser.newPage();

        // Render the EJS template to a variable
        const html = await ejs.renderFile('views/chart.ejs', chartData);
        // const html = await ejs.renderFile('./../RadheKrishna/index.html', chartData);
        // const html = require('./../RadheKrishna/index.html');

        // Set the HTML content for the page
        await page.setContent(html);

        console.log("html",html);
        console.log("page",page);

        // Generate a PDF from the HTML content
        const pdfBuffer = await page.pdf();

        // Send the PDF as a response
        res.setHeader('Content-Type', 'application/pdf');
        res.send(pdfBuffer);



        // await page.goto('https://developer.chrome.com/');

        // Close the browser
        await browser.close();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};