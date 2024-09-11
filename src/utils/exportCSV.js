import * as XLSX from 'xlsx/xlsx.mjs';

function serializeSheet(data) {
    const noOfKeys = Object.keys(data[0]).length;
    //set column width
    const cols = [];
    for (let i = 0; i < noOfKeys; i++) {
        //calculate max width for each row
        let maxLength = 10;
        data.forEach((row) => {
            if (row[Object.keys(row)[i]] && row[Object.keys(row)[i]].length > maxLength) {
                maxLength = row[Object.keys(row)[i]].length;
            }
        });
        //set width for each column
        cols.push({ wch: maxLength + 5 });
    }
    const ws = XLSX.utils.json_to_sheet(data);
    ws["!cols"] = cols;
    return ws
}
function downloadData(sheet, filename) {
    const wb = XLSX.utils.book_new();
    const currentLang = localStorage.getItem('lang');
    wb.Workbook = { Views: [{ RTL: currentLang ? isRTL(currentLang) : isRTL('ar') }] };
    XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
    XLSX.writeFile(wb, `${filename}.xlsx`, { cellStyles: true });
}
function serializeAndDownload(data, filename) {
    const csv = serializeSheet(data);
    downloadData(csv, filename);
}
function isRTL(language) {
    switch (language) {
        case "ar":
            return true;
        default:
            return false;
    }
}
export default serializeAndDownload;
export {
    serializeSheet,
    downloadData,
    serializeAndDownload,
}