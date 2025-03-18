import Papa from "papaparse";

export const parseCSV = (csvFile, callback) => {
  Papa.parse(csvFile, {
    header: true, // Treats first row as column names
    skipEmptyLines: true,
    complete: (result) => callback(result.data),
  });
};
