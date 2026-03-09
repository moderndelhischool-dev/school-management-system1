// import React from "react";

// function FeesStructure() {
//   return (
//     <>
//       <section className="fees-section">
//         <div className="fees-header">
//           <h2>Fees & Uniform Information</h2>
//           <p>
//             Transparent fee structure and complete uniform details for the
//             academic year.
//           </p>
//         </div>

//         <div className="fees-container">
//           {/* FEES TABLE */}c

//           <div className="fees-box">
//             <h3 className="box-title">School Fee Structure</h3>

//             <div className="table-wrapper">
//               <table className="fees-table">
//                 <thead>
//                   <tr>
//                     <th>Class</th>
//                     <th>Admission</th>
//                     <th>Monthly</th>
//                     <th>Annual</th>
//                     <th>Total</th>
//                   </tr>
//                 </thead>

//                 <tbody>
//                   <tr>
//                     <td>Nursery</td>
//                     <td>₹5000</td>
//                     <td>₹2000</td>
//                     <td>₹3000</td>
//                     <td className="total">₹32000</td>
//                   </tr>

//                   <tr>
//                     <td>LKG</td>
//                     <td>₹5000</td>
//                     <td>₹2200</td>
//                     <td>₹3000</td>
//                     <td className="total">₹34400</td>
//                   </tr>

//                   <tr>
//                     <td>UKG</td>
//                     <td>₹5000</td>
//                     <td>₹2400</td>
//                     <td>₹3500</td>
//                     <td className="total">₹37200</td>
//                   </tr>

//                   <tr>
//                     <td>Class 1 - 5</td>
//                     <td>₹6000</td>
//                     <td>₹2800</td>
//                     <td>₹4000</td>
//                     <td className="total">₹43600</td>
//                   </tr>

//                   <tr>
//                     <td>Class 6 - 8</td>
//                     <td>₹6000</td>
//                     <td>₹3200</td>
//                     <td>₹4500</td>
//                     <td className="total">₹47400</td>
//                   </tr>

//                   <tr>
//                     <td>Class 9 - 10</td>
//                     <td>₹7000</td>
//                     <td>₹3500</td>
//                     <td>₹5000</td>
//                     <td className="total">₹54000</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>

//           {/* UNIFORM SECTION */}

//           <div className="uniform-section">
//             <div className="uniform-box">
//               {/* <img src="/summer.jpg" alt="Summer Uniform" /> */}

//               <div className="uniform-content">
//                 <h3>Summer Uniform</h3>

//                 <ul>
//                   <li>Light Blue Half Sleeve Shirt</li>
//                   <li>Grey Pants / Grey Skirt</li>
//                   <li>School Tie & Belt</li>
//                   <li>Black Shoes with Grey Socks</li>
//                 </ul>
//               </div>
//             </div>

//             <div className="uniform-box">
//               {/* <img src="/winter.jpg" alt="Winter Uniform" /> */}

//               <div className="uniform-content">
//                 <h3>Winter Uniform</h3>

//                 <ul>
//                   <li>Full Sleeve Shirt</li>
//                   <li>Grey Pants / Grey Skirt</li>
//                   <li>School Blazer with Logo</li>
//                   <li>Grey Sweater</li>
//                   <li>Black Shoes with Socks</li>
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <style>{`

// /* SECTION */

// .fees-section{
// padding:110px 8%;
// background:#F4F6F8;
// transition:0.4s;
// }

// .fees-header{
// text-align:center;
// margin-bottom:70px;
// }

// .fees-header h2{
// font-size:40px;
// font-weight:800;
// color:#0F4C6C;
// margin-bottom:10px;
// }

// .fees-header p{
// color:#4B5563;
// }

// /* CONTAINER */

// .fees-container{
// max-width:1200px;
// margin:auto;
// display:flex;
// gap:50px;
// }

// /* CARDS */

// .fees-box,
// .uniform-box{
// background:white;
// padding:35px;
// border-radius:22px;
// box-shadow:0 20px 50px rgba(15,76,108,0.12);
// border-top:4px solid #D4A24C;
// transition:all 0.4s ease;
// }

// .fees-box:hover,
// .uniform-box:hover{
// transform:translateY(-12px);
// box-shadow:
// 0 30px 70px rgba(15,76,108,0.25),
// 0 0 25px rgba(212,162,76,0.25);
// }

// /* TITLE */

// .box-title{
// font-size:22px;
// font-weight:700;
// color:#0F4C6C;
// margin-bottom:25px;
// }

// /* TABLE */

// .table-wrapper{
// overflow-x:auto;
// }

// .fees-table{
// width:100%;
// border-collapse:collapse;
// }

// .fees-table th{
// background:#0F4C6C;
// color:white;
// padding:12px;
// }

// .fees-table td{
// padding:12px;
// border-bottom:1px solid #E5E7EB;
// text-align:center;
// transition:0.3s;
// }

// .fees-table tr:hover{
// background:#F1F5F9;
// }

// .total{
// font-weight:700;
// color:#D4A24C;
// }

// /* UNIFORM */

// .uniform-section{
// flex:1;
// display:flex;
// flex-direction:column;
// gap:30px;
// }

// .uniform-box img{
// width:100%;
// height:220px;
// object-fit:cover;
// border-radius:15px;
// margin-bottom:20px;
// transition:0.5s;
// }

// .uniform-box:hover img{
// transform:scale(1.05);
// }

// .uniform-content h3{
// color:#0F4C6C;
// margin-bottom:12px;
// }

// .uniform-content ul{
// padding-left:18px;
// }

// .uniform-content li{
// margin-bottom:10px;
// color:#4B5563;
// transition:0.3s;
// }

// .uniform-content li:hover{
// color:#D4A24C;
// padding-left:5px;
// }

// /* DARK MODE */

// body.dark-mode .fees-section{
// background:#0E1A24;
// }

// body.dark-mode .fees-header h2{
// color:#D4A24C;
// }

// body.dark-mode .fees-header p{
// color:#CBD5E1;
// }

// /* DARK MODE CARDS */

// body.dark-mode .fees-box,
// body.dark-mode .uniform-box{
// background:#1B2A35;
// box-shadow:0 25px 70px rgba(0,0,0,0.8);
// }

// body.dark-mode .fees-box:hover,
// body.dark-mode .uniform-box:hover{
// transform:translateY(-12px);
// box-shadow:
// 0 35px 80px rgba(0,0,0,0.9),
// 0 0 30px rgba(212,162,76,0.4);
// }

// /* DARK MODE TABLE */

// body.dark-mode .fees-table th{
// background:#D4A24C;
// color:#0F4C6C;
// }

// body.dark-mode .fees-table td{
// border-bottom:1px solid #334155;
// color:#E2E8F0;
// }

// body.dark-mode .fees-table tr:hover{
// background:#1E293B;
// }

// /* DARK MODE TEXT */

// body.dark-mode .box-title{
// color:#D4A24C;
// }

// body.dark-mode .uniform-content li{
// color:#CBD5E1;
// }

// body.dark-mode .uniform-content li:hover{
// color:#D4A24C;
// }

// /* MOBILE */

// @media(max-width:992px){
// .fees-container{
// flex-direction:column;
// }
// }

// `}</style>
//     </>
//   );
// }

// export default FeesStructure;
