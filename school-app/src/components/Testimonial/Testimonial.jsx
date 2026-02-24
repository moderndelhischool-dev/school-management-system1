import React from "react";

function Testimonial() {
  return (
    <section className="testimonial-section">
      <h2 className="testimonial-title">Fees & Uniform Information</h2>

      <div className="testimonial-container">
        {/* LEFT SIDE – FEES */}
        <div className="fees-box">
          <h3 className="box-title">School Fee Structure</h3>

          <div className="fee-item">
            <span>Admission Fees</span>
            <span>₹5,000</span>
          </div>

          <div className="fee-item">
            <span>Monthly Tuition Fees</span>
            <span>₹2,000</span>
          </div>

          <div className="fee-item">
            <span>Examination Fees</span>
            <span>₹1,000</span>
          </div>

          <div className="fee-item">
            <span>Annual Charges</span>
            <span>₹3,000</span>
          </div>

          <a
            href="/ABC_Public_School_Fee_Structure_2026 (1).pdf"
            download
            className="fees-btn"
          >
            Download Fee Structure
          </a>
        </div>

        {/* RIGHT SIDE – UNIFORM */}
        <div className="uniform-section">
          <div className="uniform-box">
            <img src="/summer.jpg" alt="Summer Uniform" />
            <h3 className="box-title">Summer Uniform</h3>
            <ul>
              <li>Light Blue Shirt</li>
              <li>Grey Pants / Skirt</li>
              <li>Black Shoes</li>
              <li>School Tie & Belt</li>
            </ul>
          </div>

          <div className="uniform-box">
            <img src="/winter.jpg" alt="Winter Uniform" />
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

      <style>{`

.testimonial-section {
  padding: 100px 0;
  background: linear-gradient(to bottom, #f5f3ff, #ede9fe);
}

.testimonial-title {
  text-align: center;
  font-size: 38px;
  font-weight: 700;
  margin-bottom: 60px;
  color: #4c1d95;
}

.testimonial-container {
  max-width: 1200px;
  margin: auto;
  display: flex;
  gap: 40px;
  padding: 0 40px;
}

/* COMMON CARD */
.fees-box,
.uniform-box {
  background: #ffffff;
  padding: 30px;
  border-radius: 20px;
  box-shadow: 0 15px 40px rgba(76,29,149,0.12);
  transition: 0.3s ease;
}

.fees-box:hover,
.uniform-box:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 50px rgba(76,29,149,0.25);
}

/* LEFT SIDE */
.fees-box {
  flex: 1;
}

.box-title {
  font-size: 24px;
  font-weight: 600;
  color: #4c1d95;
  margin-bottom: 20px;
}

.fee-item {
  display: flex;
  justify-content: space-between;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
  font-weight: 500;
  transition: 0.3s;
}

.fee-item:hover {
  color: #7c3aed;
  transform: translateX(5px);
}

/* BUTTON — now close to list */
.fees-btn {
  margin-top: 20px;
  display: inline-block;
  padding: 12px 20px;
  border-radius: 10px;
  background: linear-gradient(135deg,#4c1d95,#7c3aed);
  color: white;
  font-weight: 600;
  text-decoration: none;
  transition: 0.3s;
}

.fees-btn:hover {
  transform: scale(1.05);
  box-shadow: 0 12px 30px rgba(124,58,237,0.35);
}

/* RIGHT SIDE */
.uniform-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 25px;
}

.uniform-box img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 15px;
  margin-bottom: 15px;
}

.uniform-box ul {
  padding-left: 20px;
}

.uniform-box li {
  margin-bottom: 8px;
  transition: 0.3s;
}

.uniform-box li:hover {
  color: #7c3aed;
  padding-left: 5px;
}

/* RESPONSIVE */
@media (max-width: 992px) {
  .testimonial-container {
    flex-direction: column;
  }
}

      `}</style>
    </section>
  );
}

export default Testimonial;
