import { useEffect, useState } from "react";
import { db } from "../firebase/firebase";
import { collection, getDocs } from "firebase/firestore";

function ClassBlocks() {
  const [classCount, setClassCount] = useState({});

  useEffect(() => {
    const loadStudents = async () => {
      const snap = await getDocs(collection(db, "students"));

      const counts = {};

      snap.docs.forEach((doc) => {
        const data = doc.data();
        const cls = data.class;

        if (cls) {
          counts[cls] = (counts[cls] || 0) + 1;
        }
      });

      setClassCount(counts);
    };

    loadStudents();
  }, []);

  return (
    <div className="row">
      {Object.keys(classCount).map((cls) => (
        <div className="col-6 col-md-3 mb-3" key={cls}>
          <div className="card shadow-sm text-center p-3">
            <h6 className="text-muted">Class {cls}</h6>
            <h4 className="fw-bold">{classCount[cls]}</h4>
            <small>Students</small>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ClassBlocks;
