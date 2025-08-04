import React, { useState } from "react";
import axios from "axios";
import { Base_Url } from "../../Api/Base_url";

const CSVUploadForm: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [system, setSystem] = useState<"A" | "B">("A");
  const [status, setStatus] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile && selectedFile.type === "text/csv") {
      setFile(selectedFile);
      setStatus(null);
    } else {
      setStatus("Only CSV files are allowed.");
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setStatus("Please select a CSV file.");
      return;
    }

    setLoading(true);
    setStatus(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        `${Base_Url}/transactions/upload/${system}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setStatus(response.data.message || "Upload successful!");
    } catch (err: any) {
      setStatus(err.response?.data?.message || "Upload failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-blue-50 to-white px-4">
      <div className="bg-white rounded-3xl shadow-xl border border-gray-200 p-10 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-600 text-center mb-8 mt-4">
          📤 Upload Transaction CSV
        </h2>

        <div className="space-y-6">
          {/* System Selector */}
          <div className="mb-4">
            <div>
              <label
                htmlFor="system"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Select Source System
              </label>
            </div>
            <div>
              <select
                id="system"
                value={system}
                onChange={(e) => setSystem(e.target.value as "A" | "B")}
                className="w-full border border-gray-300 rounded-xl px-4 py-2 bg-white shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="A">🟦 System A</option>
                <option value="B">🟥 System B</option>
              </select>
            </div>
          </div>

          {/* File Input */}
          <div className="mb-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Choose CSV File
              </label>
            </div>
            <div>
              <input
                type="file"
                accept=".csv"
                onChange={handleFileChange}
                className="w-full text-sm border border-dashed border-gray-300 rounded-xl px-4 py-3 bg-gray-50 hover:border-blue-500 transition duration-300 focus:outline-none"
              />
            </div>
          </div>

          {/* Upload Button with custom color */}
          <div className="mb-4">
            <button
              onClick={handleUpload}
              disabled={loading}
              className="w-full text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
              style={{
                backgroundColor: "#050531fb",
              }}
            >
              {loading ? "Uploading..." : "Upload File"}
            </button>
          </div>

          {/* Status Message */}
          {status && (
            <div
              className={`text-center text-sm font-medium mt-2 ${
                status.includes("failed") || status.includes("Only")
                  ? "text-red-600"
                  : "text-green-600"
              }`}
            >
              {status}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CSVUploadForm;
