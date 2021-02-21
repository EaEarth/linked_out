import {
  Button,
  Form,
  FormControl,
  Nav,
  Navbar,
  NavDropdown,
} from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircle, faSearch } from '@fortawesome/free-solid-svg-icons';

export const NavBarBottom = (props) => {
  return (
    <Navbar
      bg="light"
      variant="light"
      expand="md"
      fixed="bottom"
      className="d-md-none"
      style={{ height: '2.5rem' }}>
      <Nav.Link
        className="justify-content-center mx-auto position-relative"
        style={{ bottom: '2.75rem' }}>
        <img
          role="button"
          src="/images/search.svg"
          width="64px"
          height="64px"
          className="stretched-link"
          onClick={() => alert('Clicked!')}
        />
      </Nav.Link>
    </Navbar>
  );
};

export default NavBarBottom;
