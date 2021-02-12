import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import styles from './NavBar.module.scss';

// Default navigation bar title
const DEFAULT_NAVBAR_TITLE = 'LinkedOut';

// Navigation bar title mapping
const navBarTitleMapping: Record<string, string> = {
  '/test': 'Test',
  '/': 'Home',
  '/jobs': 'Job Announcements',
};

export const NavBar = (props) => {
  const router = useRouter();
  // Navigation bar title for mobile screen
  const [navBarTitle, setNavBarTitle] = useState(DEFAULT_NAVBAR_TITLE);
  // Hook on route change
  useEffect(() => {
    if (router.pathname in navBarTitleMapping)
      setNavBarTitle(navBarTitleMapping[router.pathname]);
    else setNavBarTitle(DEFAULT_NAVBAR_TITLE);
  }, [router.pathname]);
  // Render navigation bar
  return (
    <Navbar
      bg="primary"
      variant="dark"
      expand="md"
      sticky="top"
      className={styles.navbar}>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Brand
        href="/"
        className={`d-none d-md-block ${styles['navbar-brand']}`}>
        LinkedOut
      </Navbar.Brand>
      <Navbar.Brand className={`d-md-none ${styles['navbar-brand-mobile']}`}>
        {navBarTitle}
      </Navbar.Brand>
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <Link href="/">
            <Nav.Link active={router.pathname === '/'} href="/">
              Home
            </Nav.Link>
          </Link>
          <Link href="/test">
            <Nav.Link active={router.pathname === '/test'} href="/test">
              Test
            </Nav.Link>
          </Link>
          <Link href="/jobs">
            <Nav.Link active={router.pathname === '/jobs'} href="/jobs">
              Jobs
            </Nav.Link>
          </Link>

          <NavDropdown title="Dropdown" id="basic-nav-dropdown">
            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
            <NavDropdown.Item href="#action/3.2">
              Another action
            </NavDropdown.Item>
            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#action/3.4">
              Separated link
            </NavDropdown.Item>
          </NavDropdown>
        </Nav>
        <Form inline className="d-none d-md-flex">
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-success">Search</Button>
        </Form>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
