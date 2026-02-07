function About() {
  return (
    <section id="about" className="p-5 bg-light">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">About Our School System</h2>

        <p className="text-center text-muted mb-5">
          A smart platform designed to simplify school operations and improve
          communication.
        </p>

        <div className="row text-center">
          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Student Management</h5>
            <p className="text-muted">
              Maintain student records, attendance, fees and performance in one
              place.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Parent Access</h5>
            <p className="text-muted">
              Parents can track attendance, fees status and school updates.
            </p>
          </div>

          <div className="col-md-4 mb-4">
            <h5 className="fw-bold">Admin Control</h5>
            <p className="text-muted">
              Complete control over staff, academics and reports.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
