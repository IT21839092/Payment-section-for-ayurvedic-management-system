import React from 'react';
import { PDFViewer, Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { calculateMonthlyIncome, findHighestIncomeMonth } from './AdminManage'; // Import your utility functions
import { saveAs } from 'file-saver';
import { pdf } from '@react-pdf/renderer';
import IncomeChart from './IncomeChart'; // Import the chart component


const Report = ({ payments }) => {
  const monthlyIncome = calculateMonthlyIncome(payments);
  const highestMonth = findHighestIncomeMonth(monthlyIncome);

  const downloadPDF = () => {
    const pdfBlob = generatePDF(monthlyIncome, highestMonth);
    saveAs(pdfBlob, 'monthly_income_report.pdf');
  };

  // Implement the generatePDF function to create the PDF document using react-pdf
  const generatePDF = (monthlyIncome, highestMonth) => {
    // Create a new PDF document
    const pdfDocument = (
      <Document>
        <Page size="A4">
          <View style={styles.container}>
            <Text style={styles.title}>Monthly Income Report</Text>
            {Object.keys(monthlyIncome).map((key) => (
              <Text key={key} style={styles.text}>
                {`Month: ${key}, Income: $${monthlyIncome[key]}`}
              </Text>
            ))}
            <Text style={styles.text}>Highest Income Month: {highestMonth}</Text>
          </View>
        </Page>
      </Document>
    );

    // Generate the PDF blob
    const pdfBlob = pdf(pdfDocument);

    // Return the PDF blob
    return pdfBlob;
  };

  // Define styles for the PDF document
  const styles = StyleSheet.create({
    container: {
      padding: 20,
    },
    title: {
      fontSize: 18,
      marginBottom: 10,
      textAlign: 'center',
    },
    text: {
      fontSize: 12,
      marginBottom: 5,
    },
  });

  return (
    <div className='report'>
      <h4>Monthly Income Report</h4>
      <IncomeChart monthlyIncomeData={monthlyIncome} /> {/* Render the chart here */}
      <PDFViewer width={500} height={300}>
        <Document>
          <Page size="A4">
            <Text>Monthly Income Report</Text>
            {Object.keys(monthlyIncome).map((key) => (
              <Text key={key}>{`Month: ${key}, Income: $${monthlyIncome[key]}`}</Text>
            ))}
            <Text>Highest Income Month: {highestMonth}</Text>
          </Page>
        </Document>
      </PDFViewer>
      <button onClick={downloadPDF}>Download Report</button>
    </div>
  );
};

export default Report;
