import { useEffect, useState } from "react";
import { db } from "../../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function UserUniform({ darkMode }) {
  const [uniforms, setUniforms] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchUniforms = async () => {
    const snap = await getDocs(collection(db, "uniforms"));

    const data = snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    data.sort(
      (a, b) => (b.createdAt?.seconds || 0) - (a.createdAt?.seconds || 0),
    );

    setUniforms(data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUniforms();

    const interval = setInterval(() => {
      fetchUniforms();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-4">
        <div className="spinner-border text-purple"></div>
      </div>
    );
  }

  if (uniforms.length === 0) {
    return (
      <div
        className="text-center mt-4"
        style={{
          color: darkMode ? "#ddd6fe" : "#6b21a8",
        }}
      >
        No uniform uploaded yet.
      </div>
    );
  }

  return (
    <div
      className="container mt-4"
      style={{
        color: darkMode ? "#ffffff" : "#4c1d95",
        transition: "all 0.3s ease",
      }}
    >
      <h4 className="mb-3 text-purple">👔 School Uniform</h4>

      <div className="row">
        {uniforms.map((item) => (
          <div key={item.id} className="col-12 col-md-6 col-lg-4 mb-4">
            <div
              className="card shadow-sm h-100"
              style={{
                backgroundColor: darkMode ? "#1e1b4b" : "#ffffff",
                color: darkMode ? "#ffffff" : "#000000",
                borderRadius: "16px",
                border: darkMode ? "1px solid #312e81" : "1px solid #ddd6fe",
                transition: "all 0.3s ease",
              }}
            >
              {/* Image Box */}
              <div
                style={{
                  height: "250px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  background: darkMode ? "#312e81" : "#f3e8ff",
                  borderTopLeftRadius: "16px",
                  borderTopRightRadius: "16px",
                }}
              >
                <img
                  src={item.image}
                  alt="Uniform"
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>

              {/* Date */}
              <div className="p-3">
                <small
                  style={{
                    color: darkMode ? "#c4b5fd" : "#6b21a8",
                  }}
                >
                  {item.createdAt
                    ? new Date(item.createdAt.seconds * 1000).toLocaleString(
                        "en-IN",
                      )
                    : ""}
                </small>
              </div>
            </div>
          </div>
        ))}
      </div>

      <style>{`
        .text-purple {
          color: #7c3aed !important;
        }

        .text-purple-dark {
          color: #4c1d95 !important;
        }

        .spinner-border.text-purple {
          color: #7c3aed !important;
        }
      `}</style>
    </div>
  );
}

export default UserUniform;
