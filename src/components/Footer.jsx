function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <p>© {currentYear} CampusEats</p>
    </footer>
  );
}

export default Footer;
