import { Link } from "react-router-dom";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

export const Navigation = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container>
                <Navbar.Brand as={Link} to="/">
                    AD Helper
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse className="justify-content-end">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/">
                            Home
                        </Nav.Link>
                        <NavDropdown title="∞ Infinity" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">
                                Infinity
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/">
                                Infinity Upgrades
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Challenge
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Break Infinity
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Infinity Challenge
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Δ Eternity" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">
                                Eternity
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/ts">
                                Time Studies
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/ec">
                                Eternity Challenge
                            </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Ϟ Reality" id="basic-nav-dropdown">
                            <NavDropdown.Item as={Link} to="/">
                                Reality
                            </NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item as={Link} to="/">
                                Reality Upgrades
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Glyph
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Perk Tree
                            </NavDropdown.Item>
                            <NavDropdown.Item as={Link} to="/">
                                Automator
                            </NavDropdown.Item>
                        </NavDropdown>
                    </Nav>
                    <Navbar.Text>Options {"(soon)"}</Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};
