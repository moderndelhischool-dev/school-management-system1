import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UserCertificate({ darkMode }) {
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchCertificates = async () => {
    const snapshot = await getDocs(collection(db, "certificates"));
    const data = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    setCertificates(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchCertificates();
  }, []);

  // Proper PDF view
  const handleView = (base64File) => {
    const byteCharacters = atob(base64File.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);

    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }

    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });
    const blobUrl = URL.createObjectURL(blob);

    window.open(blobUrl, "_blank");
  };

  const handleDownload = (base64File, name) => {
    const link = document.createElement("a");
    link.href = base64File;
    link.download = name;
    link.click();
  };

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-success"></div>
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#fff" : "#000",
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-4">📜 Available Certificates</h4>

      {certificates.length === 0 && (
        <p style={{ color: darkMode ? "#cbd5e1" : "#6c757d" }}>
          No certificates available.
        </p>
      )}

      <div className="row">
        {certificates.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100"
              style={{
                backgroundColor: darkMode ? "#1e293b" : "#fff",
                color: darkMode ? "#fff" : "#000",
                borderRadius: "16px",
                transition: "all 0.3s ease",
              }}
            >
              {/* Top Icon */}
              <div
                style={{
                  background: darkMode ? "#334155" : "#f1f5f9",
                  padding: "30px",
                  textAlign: "center",
                  fontSize: "40px",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                📄
              </div>

              {/* Details */}
              <div className="p-3 d-flex flex-column">
                <h6 className="fw-bold text-truncate">{item.fileName}</h6>

                <small
                  className="mb-3"
                  style={{
                    color: darkMode ? "#cbd5e1" : "#6c757d",
                  }}
                >
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString(
                        "en-IN",
                      )
                    : ""}
                </small>

                <div className="mt-auto d-flex gap-2">
                  <button
                    className="btn btn-primary btn-sm w-50"
                    onClick={() => handleView(item.file)}
                  >
                    View
                  </button>

                  <button
                    className="btn btn-success btn-sm w-50"
                    onClick={() => handleDownload(item.file, item.fileName)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCertificate;
