const Debt = require('../models/debtModel');
const Transaction = require('../models/transactionModel'); // Assuming you have one
const moment = require('moment');
const PDFDocument = require('pdfkit'); // Only if you're generating PDFs

// Get summarized monthly report
exports.getMonthlyReport = async (req, res) => {
  const { month, year } = req.query;
  const userId = req.user._id;

  try {
    const start = moment(`${year}-${month}-01`).startOf('month').toDate();
    const end = moment(start).endOf('month').toDate();

    const debts = await Debt.find({ userId, dueDate: { $gte: start, $lte: end } });
    const transactions = await Transaction.find({ userId, date: { $gte: start, $lte: end } });

    // Simple summary — you can customize
    const report = {
      month,
      year,
      totalDebts: debts.length,
      totalTransactions: transactions.length,
      debtSummary: debts,
      transactionSummary: transactions,
    };

    res.json(report);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch monthly report', details: err.message });
  }
};

// Downloadable report (e.g. PDF)
exports.downloadReport = async (req, res) => {
  const { month, year, format } = req.query;
  const userId = req.user._id;

  try {
    const start = moment(`${year}-${month}-01`).startOf('month').toDate();
    const end = moment(start).endOf('month').toDate();

    const debts = await Debt.find({ userId, dueDate: { $gte: start, $lte: end } });
    const transactions = await Transaction.find({ userId, date: { $gte: start, $lte: end } });

    if (format === 'pdf') {
      const doc = new PDFDocument();
      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', `attachment; filename=financial-report-${year}-${month}.pdf`);
      doc.pipe(res);

      doc.fontSize(20).text(`Monthly Financial Report - ${month}/${year}`);
      doc.moveDown();

      doc.fontSize(14).text(`Total Debts: ${debts.length}`);
      doc.text(`Total Transactions: ${transactions.length}`);
      doc.moveDown();

      doc.text('Debts:', { underline: true });
      debts.forEach((debt, i) => {
        doc.text(`${i + 1}. ${debt.name} - ₹${debt.amount}`);
      });

      doc.addPage();
      doc.text('Transactions:', { underline: true });
      transactions.forEach((txn, i) => {
        doc.text(`${i + 1}. ${txn.category} - ₹${txn.amount}`);
      });

      doc.end();
    } else {
      res.status(400).json({ error: 'Unsupported format' });
    }
  } catch (err) {
    res.status(500).json({ error: 'Failed to generate report', details: err.message });
  }
};
