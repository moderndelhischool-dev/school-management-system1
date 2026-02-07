function Contact() {
  return (
    <section id="contact" className="p-5">
      <div className="container">
        <h2 className="fw-bold text-center mb-4">Contact Us</h2>

        <p className="text-center text-muted mb-5">
          Have questions? Get in touch with our school team.
        </p>

        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card shadow-sm p-4">
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Enter your name"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  placeholder="Enter your email"
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Message</label>
                <textarea
                  className="form-control"
                  rows="4"
                  placeholder="Write your message"
                ></textarea>
              </div>

              <button className="btn btn-primary w-100">Send Message</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
