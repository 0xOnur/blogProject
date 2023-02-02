import {
  Container,
  Navbar,
  Offcanvas,
  Form,
  Button,
  NavDropdown,
  Col,
} from "react-bootstrap/";
import Nav from "react-bootstrap/Nav";
import {useSelector} from "react-redux";
import { MdOutlinePostAdd, MdHomeFilled } from "react-icons/md";
import {FaUserCircle} from "react-icons/fa";

function NAV() {

  const user = useSelector((state) => state?.user?.user);


  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} bg="light" expand={expand} className="mb-3">
          <Container>
            <Col md='8'>
              <Navbar.Brand href="/">
                <img
                  alt=""
                  src="https://react-bootstrap.github.io/logo.svg"
                  width="30"
                  height="30"
                  className="d-inline-block align-top"
                />{" "}
                Blogify
              </Navbar.Brand>
            </Col>
            
            {/* this area username link and dropdown menu for logout and profile page link */}
            <Col md='2'>
              {user?.userFound && (
                <NavDropdown title={user.userFound.username} id="basic-nav-dropdown">
                  <NavDropdown.Item href="/profile">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/logout">
                    Logout
                  </NavDropdown.Item>
                </NavDropdown>
              )}
            </Col>
            
            {/* this area toogle menu and items */}
            <Col md='2'>
              <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
              <Navbar.Offcanvas
                id={`offcanvasNavbar-expand-${expand}`}
                aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                placement="end"
                >
                
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Menü
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link href="/">
                        <MdHomeFilled /> Home
                      </Nav.Link>
                      {user?.userFound && (
                        <Nav.Link href="/posts/add">
                          <MdOutlinePostAdd /> Yeni Yazı
                        </Nav.Link>
                      )}
                      {user?.userFound ? null : (
                        <Nav.Link href="/login">
                          <FaUserCircle /> Giriş Yap/Kayıt Ol
                        </Nav.Link>
                      )}
                    </Nav>
                    <Form className="d-flex">
                      <Form.Control
                        type="search"
                        placeholder="Search"
                        className="me-2"
                        aria-label="Search"
                      />
                      <Button variant="outline-success">Search</Button>
                    </Form>
                  </Offcanvas.Body>
              </Navbar.Offcanvas>

            </Col>

          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NAV;
