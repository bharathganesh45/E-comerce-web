function AboutPage() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <h1 className="display-4 fw-bold mb-4 text-center">About Time To Buy</h1>
          <div className="card shadow-sm border-0">
            <div className="card-body p-5">
              <p className="lead mb-4">
                Welcome to <strong>Time To Buy</strong>, your trusted destination for
                quality timepieces and accessories.
              </p>
              <h3 className="h5 fw-bold mb-3">Our Mission</h3>
              <p className="mb-4">
                We are committed to providing you with a seamless shopping experience,
                offering a wide selection of premium products at competitive prices.
                Our goal is to make online shopping convenient, secure, and enjoyable.
              </p>
              <h3 className="h5 fw-bold mb-3">What We Offer</h3>
              <ul className="mb-4">
                <li>Wide range of quality products</li>
                <li>Secure and easy checkout process</li>
                <li>Fast and reliable delivery</li>
                <li>Excellent customer support</li>
              </ul>
              <h3 className="h5 fw-bold mb-3">Contact Us</h3>
              <p className="mb-0">
                If you have any questions or need assistance, please don't hesitate to
                reach out to our customer support team. We're here to help!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;

