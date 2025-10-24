export const PrintMail = (id) => {
  console.log("print mail");
  const mailContainer = document.getElementById(id);
  if (!mailContainer) {
    console.log("no mail");
    return;
  }
  const printWindow = window.open("", "_blank");
  printWindow.document.write(
    `
    <html>
        <head>
            <title>Print Mail</title>
            <style>
            /* Include minimal Tailwind styles for print */
            body { font-family: Arial, sans-serif; padding: 20px; line-height: 1.6; }
            h2 { font-size: 20px; margin-bottom: 10px; }
            p { margin-bottom: 10px; }
            </style>
        </head>
        <body>
            ${mailContainer.innerHTML}
        </body>
    </html>
    `
  );
  printWindow.document.close();
  printWindow.document.focus();
  printWindow.document.print();
  printWindow.close();
};
