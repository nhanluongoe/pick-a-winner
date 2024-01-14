import * as XLSX from "xlsx";

const useXlsx = () => {
  const download = (data: any, filename: string) => {
    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "test");
    XLSX.writeFile(wb, `${filename}.xlsx`);
  };

  return {
    download,
  };
};

export default useXlsx;
