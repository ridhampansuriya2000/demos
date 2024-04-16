// const PDFDocument = require('pdfkit');
const { ChartJSNodeCanvas } = require('chartjs-node-canvas');

// Configure the chart renderer
const width = 400; // Width of the chart
const height = 200; // Height of the chart
const chartCallback = (ChartJS) => {

};

const chartNode = new ChartJSNodeCanvas({ width, height, chartCallback });


exports.PdfGenerator = async (req, res) => {
    try {
        // const doc = new PDFDocument();
        // const chartImage = await generateChart(); // Generate a chart image
        //
        // // Set up the response headers to indicate it's a PDF file
        // res.setHeader('Content-Type', 'application/pdf');
        // res.setHeader('Content-Disposition', 'attachment; filename="report.pdf"');
        //
        // // Pipe the PDF document directly to the response
        // doc.pipe(res);
        //
        // // Add content to the PDF
        // doc.lineWidth(2); // Set the line width to 2 for the header and footer lines
        // doc.strokeColor('blue'); // Set the stroke color to blue
        //
        // doc.moveTo(50, 50).lineTo(550, 50).stroke();
        //
        // // Logo at the top left of the header
        // doc.text('LOGO', 60, 30, { width: 100 }); // Replace 'path/to/your/logo.png' with your logo path
        //
        // // Header Text
        // doc.fillColor('black'); // Set the fill color to black for header text
        // doc.text('Header Text', 100, 30, { align: 'right' });
        //
        //
        // // Footer
        // doc.lineWidth(2); // Set the line width to 2 for the footer line
        // doc.strokeColor('blue'); // Set the stroke color to blue
        //
        // // Content
        // doc.text('Sample PDF Report', 100, 100);
        // doc.image(chartImage, 100, 150, { width: 400 });
        //
        // // Add a blue line at the bottom of the page (footer)
        // doc.moveTo(50, 750).lineTo(550, 750).stroke();
        //
        // doc.text('Footer Text Left', 100, 700); // Add text at the bottom left of the footer
        // doc.text('Footer Text Right', 400, 10, { align: 'right' }); // Add text at the bottom right of the footer
        //
        // // End the PDF stream
        // doc.end();
    } catch (error) {
        console.error('Error generating PDF:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

// async function generateChart() {
//     // Use chartjs-node-canvas to generate a chart image
//     const configuration = {
//         type: 'bar',
//         data: {
//             labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
//             datasets: [{
//                 label: 'Sample Data',
//                 data: [12, 19, 3, 5, 2, 3],
//                 backgroundColor: 'rgba(75, 192, 192, 0.2)',
//                 borderColor: 'rgba(75, 192, 192, 1)',
//                 borderWidth: 1
//             }]
//         },
//         options: {
//             scales: {
//                 y: {
//                     beginAtZero: true
//                 }
//             }
//         }
//     };
//
//     const image = await chartNode.renderToBuffer(configuration);
//
//     return image;
// }

const { createCanvas, loadImage } = require("canvas");
const { PDFDocument, rgb } = require("pdf-lib");
const Chart = require("chart.js");

// Define your chart data
const chartData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    data: [12, 19, 3, 5, 2, 3]
};

exports.PdfGenerator2 = async (req, res) => {
    // Create a canvas to render the chart
    const canvas = createCanvas(400, 400);
    const ctx = canvas.getContext("2d");

    // Create a Chart.js chart and render it on the canvas
    new Chart(ctx, {
        type: "line",
        data: {
            labels: chartData.labels,
            datasets: [
                {
                    label: "# of Votes",
                    data: chartData.data,
                    backgroundColor: chartData.labels.map(() => 'rgba(75, 192, 192, 0.2)'),
                    borderColor: chartData.labels.map(() => 'rgba(75, 192, 192, 1)'),
                    borderWidth: 1,
                },
            ],
        },
    });

    // Save the canvas as an image
    const chartImage = canvas.toBuffer("image/png");

    // Create a new PDF document
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage([600, 400]);
    const image = await pdfDoc.embedPng(chartImage);

    // Draw the chart image on the PDF page
    const { width, height } = image.size;
    const scale = 0.5; // Adjust the scale as needed
    const yPosition = 100; // Adjust the vertical position

    page.drawImage(image, {
        x: 200,
        y: -50,
        width: 300,
        height: 400,
    });

    // Serialize the PDF to a buffer
    const pdfBytes = await pdfDoc.save();

    // Send the generated PDF as a response
    res.setHeader("Content-Disposition", "attachment; filename=report.pdf");
    res.setHeader("Content-Type", "application/pdf");
    res.end(pdfBytes);
};