import React from "react";

function FeesStructure() {
  return (
    <section className="fees-section">
      <div className="fees-header">
        <h2>Fees & Uniform Information</h2>
        <p>
          Transparent fee structure and complete uniform details for the
          academic year.
        </p>
      </div>

      <div className="fees-container">
        {/* LEFT SIDE – FEES */}
        <div className="fees-box">
          <h3 className="box-title">School Fee Structure</h3>

          <div className="fee-item">
            <span>Admission Fees</span>
            <span className="price">₹5,000</span>
          </div>

          <div className="fee-item">
            <span>Monthly Tuition Fees</span>
            <span className="price">₹2,000</span>
          </div>

          <div className="fee-item">
            <span>Examination Fees</span>
            <span className="price">₹1,000</span>
          </div>

          <div className="fee-item">
            <span>Annual Charges</span>
            <span className="price">₹3,000</span>
          </div>

          <a
            href="/ABC_Public_School_Fee_Structure_2026 (1).pdf"
            download
            className="fees-btn"
          >
            Download Complete Fee Structure
          </a>
        </div>

        {/* RIGHT SIDE – UNIFORM */}
        <div className="uniform-section">
          <div className="uniform-box">
            <img src="/summer.jpg" alt="Summer Uniform" />
            <div className="uniform-content">
              <h3 className="box-title">Summer Uniform</h3>
              <ul>
                <li>Light Blue Shirt</li>
                <li>Grey Pants / Skirt</li>
                <li>Black Shoes</li>
                <li>School Tie & Belt</li>
              </ul>
            </div>
          </div>

          <div className="uniform-box">
            <img src="/winter.jpg" alt="Winter Uniform" />
            <div className="uniform-content">
              <h3 className="box-title">Winter Uniform</h3>
              <ul>
                <li>Blazer with Logo</li>
                <li>Full Sleeve Shirt</li>
                <li>Grey Sweater</li>
                <li>Black Shoes</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      <style>{`

/* ================= BASE ================= */

.fees-section {
  padding: 110px 8%;
  background: linear-gradient(to bottom, #f5f3ff, #ede9fe);
  transition: 0.4s ease;
}

.fees-header {
  text-align: center;
  margin-bottom: 70px;
}

.fees-header h2 {
  font-size: 40px;
  font-weight: 800;
  color: #4c1d95;
  margin-bottom: 15px;
}

.fees-header p {
  color: #6b7280;
  font-size: 16px;
}

.fees-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 50px;
}

/* ================= CARDS ================= */

.fees-box,
.uniform-box {
  background: #ffffff;
  padding: 35px;
  border-radius: 22px;
  box-shadow: 0 20px 50px rgba(76,29,149,0.12);
  transition: all 0.4s cubic-bezier(0.22,1,0.36,1);
}

.fees-box:hover,
.uniform-box:hover {
  transform: translateY(-12px);
  box-shadow: 
    0 30px 70px rgba(76,29,149,0.25),
    0 0 25px rgba(124,58,237,0.25);
}

/* ================= FEES ================= */

.fees-box {
  flex: 1;
}

.box-title {
  font-size: 22px;
  font-weight: 700;
  color: #4c1d95;
  margin-bottom: 25px;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  transition: 0.3s;
}

.fee-item:hover {
  color: #7c3aed;
  transform: translateX(6px);
}

.price {
  font-weight: 600;
}

.fees-btn {
  margin-top: 30px;
  display: inline-block;
  padding: 14px 24px;
  border-radius: 12px;
  background: linear-gradient(135deg,#4c1d95,#7c3aed);
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
}

.fees-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 15px 35px rgba(124,58,237,0.4);
}

/* ================= UNIFORM ================= */

.uniform-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 30px;
}

.uniform-box img {
  width: 100%;
  height: 220px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 20px;
  transition: 0.5s ease;
}

.uniform-box:hover img {
  transform: scale(1.05);
}

.uniform-content ul {
  padding-left: 18px;
}

.uniform-content li {
  margin-bottom: 10px;
  transition: 0.3s;
}

.uniform-content li:hover {
  color: #7c3aed;
  padding-left: 5px;
}

/* ================= DARK MODE ================= */

body.dark-mode .fees-section {
  background: linear-gradient(to bottom, #0f172a, #111827);
}

body.dark-mode .fees-header h2 {
  color: #e9d5ff;
}

body.dark-mode .fees-header p {
  color: #cbd5e1;
}

body.dark-mode .fees-box,
body.dark-mode .uniform-box {
  background: #1e293b;
  box-shadow: 0 30px 70px rgba(0,0,0,0.7);
}

body.dark-mode .box-title {
  color: #c4b5fd;
}

body.dark-mode .fee-item {
  border-bottom: 1px solid #334155;
  color: #e2e8f0;
}

body.dark-mode .uniform-content li {
  color: #e2e8f0;
}

body.dark-mode .fees-btn {
  background: linear-gradient(135deg,#7c3aed,#a78bfa);
}

@media (max-width: 992px) {
  .fees-container {
    flex-direction: column;
  }
}

      `}</style>
    </section>
  );
}

export default FeesStructure;
