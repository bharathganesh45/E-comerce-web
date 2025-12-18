function Footer() {
  return (
    <footer className="mt-auto bg-white ttb-footer">
      <div className="ttb-container py-3 d-flex flex-column flex-md-row justify-content-between small text-muted">
        <div>
          <span className="fw-semibold">Time To Buy</span> &copy; {new Date().getFullYear()}
        </div>
        <div className="d-flex gap-3 mt-2 mt-md-0">
          <a href="#" className="text-decoration-none text-muted">
            About
          </a>
          <a href="#" className="text-decoration-none text-muted">
            Contact
          </a>
          <a href="#" className="text-decoration-none text-muted">
            Instagram
          </a>
          <a href="#" className="text-decoration-none text-muted">
            Twitter / X
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;


