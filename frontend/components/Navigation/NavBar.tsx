import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Button, Form, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import styles from './NavBar.module.scss';
import { BrowseModal } from '../browse/modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle } from '@fortawesome/free-regular-svg-icons';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useRootStore } from '../../stores/stores';
import { observer } from 'mobx-react-lite';

// Default navigation bar title
const DEFAULT_NAVBAR_TITLE = 'LinkedOut';

// Navigation bar title mapping
const navBarTitleMapping: Record<string, string> = {
  '/test': 'Test',
  '/': 'Home',
  '/jobs': 'Job Announcements',
  '/auth/login': 'Login',
  '/auth/register': 'Register',
};

export const NavBar = observer((props) => {
  const router = useRouter();
  const authStore = useRootStore().authStore;
  // Navigation bar title for mobile screen
  const [navBarTitle, setNavBarTitle] = useState(DEFAULT_NAVBAR_TITLE);
  const [modalShow, setModalShow] = useState(false);
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
        </Nav>
        <Form inline className="d-none d-md-flex">
          <Button
            variant="primary"
            style={{ backgroundColor: '#61DCD5' }}
            onClick={() => setModalShow(true)}>
            <FontAwesomeIcon icon={faSearch} /> Search
          </Button>
          <BrowseModal show={modalShow} onHide={() => setModalShow(false)} />
        </Form>
        <Nav>
          <NavDropdown
            title={
              <>
                <FontAwesomeIcon icon={faUserCircle} size="lg" />{' '}
                {authStore.username}
              </>
            }
            id="basic-nav-dropdown"
            active={router.pathname.match(/\/auth\/.+/) !== null}
            className={styles['user-menu']}>
            {!authStore.isLoggedIn && (
              <Link href="/auth/login">
                <NavDropdown.Item href="/auth/login">Login</NavDropdown.Item>
              </Link>
            )}
            {authStore.isLoggedIn && (
              <NavDropdown.Item onClick={() => router.push('/jobs/list')}>
                My Recruited Job
              </NavDropdown.Item>
            )}
            {authStore.isLoggedIn && (
              <NavDropdown.Item onClick={() => router.push('/apply')}>
                My Applied Job
              </NavDropdown.Item>
            )}
            {authStore.isLoggedIn && (
              <NavDropdown.Item onClick={() => authStore.logout()}>
                Logout
              </NavDropdown.Item>
            )}
            {!authStore.isLoggedIn && (
              <Link href="/auth/register">
                <NavDropdown.Item href="/auth/register">
                  Register
                </NavDropdown.Item>
              </Link>
            )}
          </NavDropdown>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
});

export default NavBar;
