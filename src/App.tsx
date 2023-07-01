import React, { useState } from "react";
import Toolbar from "./Toolbar";
import "./App.css";
interface CSVRow {
  [key: string]: string;
}

const Index: React.FC = () => {
  const [csvData, setCSVData] = useState<CSVRow[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Function to handle CSV file upload
  const handleFileUpload = (file: File | null) => {
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        try {
          const contents = e.target?.result as string;
          const rows = contents.split("\n");
          const header = rows[0].split(",");

          const data: CSVRow[] = [];
          for (let i = 1; i < rows.length; i++) {
            const rowData = rows[i].split(",");
            if (rowData.length === header.length) {
              const rowObject: CSVRow = {};
              for (let j = 0; j < header.length; j++) {
                rowObject[header[j]] = rowData[j];
              }
              data.push(rowObject);
            }
          }

          setCSVData(data);
        } catch (error) {
          console.error(error);
          // Handle error
        }
      };

      reader.readAsText(file);
    }
  };
  // Function to handle search query change
  const handleSearchQueryChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSearchQuery(event.target.value);
  };

  // Filter the data based on the search query
  const filteredData = csvData.filter((row) =>
    Object.values(row).some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    )
  );
  // show if csvData is greater than zero
  const showSearchInput = csvData.length > 0;
  return (
    <div>
      {/* tool bar inport */}
      <Toolbar onFileUpload={handleFileUpload} />

      <div className="container pt-5">
        {/* search input for loaded csv */}
        {!showSearchInput ? (
          <p className="text-center h2">Please upload a CSV file</p>
        ) : (
          <input
            placeholder="Search"
            type="text"
            className="form-control  search-input shadow-sm"
            value={searchQuery}
            onChange={handleSearchQueryChange}
          />
        )}

        {/* loop the loaded csv */}
        <div className="row">
          {filteredData.map((row, index) => (
            <div
              key={index}
              className="col-xs-12 col-md-6 col-lg-4 col-xl-4 my-3"
            >
              <div className="card shadow-sm">
                <div className="card-body">
                  {Object.entries(row).map(([key, value]) => (
                    <p key={key}>
                      <strong>{key}: </strong> {value}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Index;
