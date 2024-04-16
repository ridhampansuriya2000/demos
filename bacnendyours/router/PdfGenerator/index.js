const express = require("express");
const pdfData = require("./controller");
const pdfData3 = require("./controller3");
const PdfGeneratorRouter = express.Router();
// const {tokenVerify} = require("../../Middleware")

PdfGeneratorRouter.route('/getPdf').get( pdfData.PdfGenerator);
PdfGeneratorRouter.route('/getPdf2').get( pdfData.PdfGenerator2);
PdfGeneratorRouter.route('/getPdf3').get( pdfData3.PdfGenerator);

module.exports = PdfGeneratorRouter;