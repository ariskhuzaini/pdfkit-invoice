// dependencies
const fs = require("fs");
const PDFDocument = require("pdfkit");

// product data
// const invoice = JSON.parse(fs.readFileSync("invoice.json"));

function createInvoice(invoice) {
  let doc = new PDFDocument({ size: "A4", margin: 40 });

  generateHeader(doc);
  generateCustomerInformation(doc, invoice);
  generateInvoiceTable(doc, invoice);
  generateFooter(doc);
  
  doc.end();
  doc.pipe(fs.createWriteStream(`${__dirname}/invoice/${invoice.invoice_nr + '_' + invoice.shipping.name}.pdf`));
}

function generateHeader(doc) {
  doc
    .image("logo.png", 50, 45, { width: 150 })
    .fillColor("#444444")
    // .fontSize(20)
    // .text("SUN POWER CERAMICS", 110, 57)
    .fontSize(10)
    .text("SUN POWER CERAMICS", 200, 50, { align: "right" })
    .text("123 Main Street", 200, 65, { align: "right" })
    .text("Jawir Tenggara, WIR, 10025", 200, 80, { align: "right" })
    .moveDown();
}

function generateCustomerInformation(doc, invoice) {
  doc
    .fillColor("#444444")
    .fontSize(20)
    .text("Invoice", 50, 150);

  generateHr(doc, 175);

  const customerInformationTop = 190;

  doc
    .fontSize(10)
    .text("Invoice Number:", 50, customerInformationTop)
    .font("Helvetica-Bold")
    .text(invoice.invoice_nr, 150, customerInformationTop)
    .font("Helvetica")
    .text("Invoice Date:", 50, customerInformationTop + 15)
    .text(formatDate(new Date()), 150, customerInformationTop + 15)
    .text("Balance Due:", 50, customerInformationTop + 30)
    .text(
      formatCurrency(invoice.subtotal - invoice.paid),
      150,
      customerInformationTop + 30
    )

    .font("Helvetica-Bold")
    .text(invoice.shipping.name, 300, customerInformationTop)
    .font("Helvetica")
    .text(invoice.shipping.address, 300, customerInformationTop + 15)
    .text(
      invoice.shipping.phone +
        " / " +
      invoice.shipping.email,
      300,
      customerInformationTop + 30
    )
    .moveDown();

  generateHr(doc, 242);
}

// non responsive
// function generateInvoiceTable(doc, invoice) {
//   let i;
//   const invoiceTableTop = 300;

//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     invoiceTableTop,
//     "No.",
//     "Name",
//     "Code",
//     "Price",
//     "Quantity",
//     "Total Price"
//   );
//   generateHr(doc, invoiceTableTop + 20);
//   doc
//     .font("Helvetica");

//   for (i = 0; i < invoice.items.length; i++) {
//     const item = invoice.items[i];
//     const position = invoiceTableTop + (i + 1) * 30;
//     generateTableRow(
//       doc,
//       position,
//       i + 1 + ".", // Number the items from 1 to n
//       item.product,
//       item.code,
//       formatCurrency(item.price),
//       item.quantity,
//       formatCurrency(item.totalPrice)
//     );

//     generateHr(doc, position + 20);
//   }

//   const subtotalPosition = invoiceTableTop + (i + 1) * 30;
//   generateTableRow(
//     doc,
//     subtotalPosition,
//     "",
//     "",
//     "",
//     "Subtotal",
//     "",
//     formatCurrency(invoice.subtotal)
//   );

//   const paidToDatePosition = subtotalPosition + 20;
//   generateTableRow(
//     doc,
//     paidToDatePosition,
//     "Payment is due within 15 days.",
//     "",
//     "",
//     "Paid To Date",
//     "",
//     formatCurrency(invoice.paid)
//   );

//   const duePosition = paidToDatePosition + 25;
//   doc.font("Helvetica-Bold");
//   generateTableRow(
//     doc,
//     duePosition,
//     "Thank you for your business.",
//     "",
//     "",
//     "Balance Due",
//     "",
//     formatCurrency(invoice.subtotal - invoice.paid)
//   );
// }


// function generateFooter(doc) {
//   doc
//     .fontSize(10)
//     .text(
//       "Payment is due within 15 days. Thank you for your business.",
//       50,
//       720,
//       { align: "center", width: 500 }
//     );
// }

function generateInvoiceTable(doc, invoice) {
  let i;
  let invoiceTableTop = 300; // Initial position
  const maxHeight = doc.page.height - doc.page.margins.bottom; // Updated variable name

  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    invoiceTableTop,
    "No.",
    "Name",
    "Code",
    "Price",
    "Quantity",
    "Total Price"
  );
  generateHr(doc, invoiceTableTop + 20);
  doc.font("Helvetica");

  for (i = 0; i < invoice.items.length; i++) {
    const item = invoice.items[i];
    let position = invoiceTableTop + (i + 1) * 30; // Declare as 'let'

    // Check if a new page is needed
    if (position > maxHeight - 50) { // Updated variable name
      doc.addPage(); // Start a new page
      invoiceTableTop = 50; // Reset the table position
      generateTableRow(
        doc,
        invoiceTableTop,
        "No.",
        "Name",
        "Code",
        "Price",
        "Quantity",
        "Total Price"
      );
      generateHr(doc, invoiceTableTop + 20);
      doc.font("Helvetica");
      position = invoiceTableTop + 30; // Update the current position
    }

    generateTableRow(
      doc,
      position,
      i + 1 + ".",
      item.product,
      item.code,
      formatCurrency(item.price),
      item.quantity,
      formatCurrency(item.totalPrice)
    );

    generateHr(doc, position + 20);
  }

const subtotalPosition = invoiceTableTop + (i + 1) * 30;
  generateTableRow(
    doc,
    subtotalPosition,
    "",
    "",
    "",
    "Subtotal",
    "",
    formatCurrency(invoice.subtotal)
  );

  const paidToDatePosition = subtotalPosition + 20;
  generateTableRow(
    doc,
    paidToDatePosition,
    "Payment is due within 15 days.",
    "",
    "",
    "Paid To Date",
    "",
    formatCurrency(invoice.paid)
  );

  const duePosition = paidToDatePosition + 25;
  doc.font("Helvetica-Bold");
  generateTableRow(
    doc,
    duePosition,
    "Thank you for your business.",
    "",
    "",
    "Balance Due",
    "",
    formatCurrency(invoice.subtotal - invoice.paid)
  );
}


function generateFooter(doc) {
  const pageHeight = doc.page.height - doc.page.margins.bottom;
  doc
    .font("Helvetica-Bold")
    .fontSize(10)
    .text(
      "Terms and Conditions",
      50,
      pageHeight - 60
    )
    .font("Helvetica")
    .text("1. The invoice must be paid in full no later than the due date specified on the invoice.",
      50,
      pageHeight - 40
    )
    .text("2. This invoice is considered valid only if it is paid in full by the due date.",
    )
    .text("3. Payments received after the due date may not be accepted or may be subject to late payment fees.",
    );
}

function generateTableRow(
  doc,
  y,
  no,
  code,
  name,
  price,
  quantity,
  totalPrice
) {
  doc
    .fontSize(10)
    .text(no, 50, y)
    .text(code, 90, y)
    .text(name, 260, y)
    .text(price, 340, y, { width: 90})
    .text(quantity, 420, y, { width: 50, align: 'center'})
    .text(totalPrice, 0, y, { align: "right" });
}

function generateHr(doc, y) {
  const docWidth = doc.page.width - doc.page.margins.left - doc.page.margins.right;
  doc
    .strokeColor("#aaaaaa")
    .lineWidth(1)
    .moveTo(doc.page.margins.left, y)
    .lineTo(doc.page.margins.left + docWidth, y)
    .stroke();
}

function formatCurrency(rupiah) {
  const formattedRupiah = rupiah.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return "Rp. " + formattedRupiah;
}

function formatDate(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return year + "/" + month + "/" + day;
}

module.exports = {
  createInvoice
};