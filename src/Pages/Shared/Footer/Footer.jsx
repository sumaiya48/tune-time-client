
const Footer = () => {
    return (
        <div>
          <footer className="footer  p-10 bg-sky-800 text-white">
  <aside>
    <img style={{ marginTop: '-80px' }} src="https://i.ibb.co/8Nj3sC2/your-image.jpg" alt="ACME Logo" width="200" height="50" />
    <p style={{ marginTop: '-80px' ,marginLeft:'35px' }}>TIME & TUNE MUSIC SCHOOL<br />Established since 1992</p>
  </aside>
  <nav>
    <h6 className="footer-title">Services</h6>
    <a className="link link-hover">Branding</a>
    <a className="link link-hover">Design</a>
    <a className="link link-hover">Marketing</a>
    <a className="link link-hover">Advertisement</a>
  </nav>
  <nav>
    <h6 className="footer-title">Company</h6>
    <a className="link link-hover">About us</a>
    <a className="link link-hover">Contact</a>
    <a className="link link-hover">Jobs</a>
    <a className="link link-hover">Press kit</a>
  </nav>
  <nav>
    <h6 className="footer-title">Legal</h6>
    <a className="link link-hover">Terms of use</a>
    <a className="link link-hover">Privacy policy</a>
    <a className="link link-hover">Cookie policy</a>
  </nav>
</footer>
<footer className="footer footer-center p-4 bg-sky-900  text-white">
  <aside>
    <p>Copyright © 2024 - All right reserved by Sumaiya Akter</p>
  </aside>
</footer>

        </div>
    );
};

export default Footer;