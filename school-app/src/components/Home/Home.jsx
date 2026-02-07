function Home() {
  return (
    <section id="home" className="p-5">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-md-6">
            <h1 className="fw-bold mb-3">Smart School Management System</h1>

            <p className="text-muted mb-4">
              Manage students, parents, teachers and administration with a
              modern and secure school management platform.
            </p>

            <button className="btn btn-primary px-4 me-3">Get Started</button>

            <button className="btn btn-outline-primary px-4">Learn More</button>
          </div>

          <div className="col-md-6 text-center">
            <img
              src="https://cdn-icons-png.flaticon.com/512/3135/3135755.png"
              alt="school"
              style={{ maxWidth: "280px" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Home;
