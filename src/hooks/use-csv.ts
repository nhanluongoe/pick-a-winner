import { useState } from "react";

export default function useCSV() {
  const [file, setFile] = useState<File | null>(null);

  const fileReader = new FileReader();

  const importCSV = (
    e: any,
    cb: (arg: string | ArrayBuffer | null) => void,
  ) => {
    const file = e.target.files[0];

    if (file) {
      setFile(file);
      fileReader.readAsText(file);

      fileReader.onload = () => {
        const csv = fileReader.result;
        cb(csv);
      };
    }
  };

  return { file, importCSV };
}
