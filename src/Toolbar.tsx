import React, { useRef } from "react";

interface ToolbarProps {
  onFileUpload: (file: File | null) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onFileUpload }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      onFileUpload(file);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-dark">
      <div className="container-fluid">
        {/* for mobile screen */}
        <div className="d-block d-md-none">
          {/* csv file uplaod */}
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          {/* on click button to upload */}
          <button
            type="button"
            className="btn btn-light btn-md w-100"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload CSV file
          </button>
        </div>
        {/* mobile screen end here */}
        <div className="collapse navbar-collapse" id="navbarText">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <div className="h3 text-white">React Task</div>
            </li>
          </ul>
          {/* csv file uplaod */}
          <input
            type="file"
            accept=".csv"
            style={{ display: "none" }}
            ref={fileInputRef}
            onChange={handleFileUpload}
          />
          {/* on click button to upload */}
          <button
            type="button"
            className="btn btn-light btn-md"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload CSV file
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Toolbar;
