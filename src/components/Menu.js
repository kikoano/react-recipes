import { Navbar, Nav, Container } from "react-bootstrap";
import { NavLink } from "react-router-dom";
const Menu = () => {
    return (
        <Navbar className="mb-3" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand as={NavLink} to="/">Recipes app</Navbar.Brand>
                <Nav className="me-auto">
                    <Nav.Link as={NavLink} to="/recipes" activeClassName="active" >List recipes</Nav.Link>
                    <Nav.Link as={NavLink} to="/addRecipe" activeClassName="active" >Add Recipe</Nav.Link>
                </Nav>
            </Container>
        </Navbar >
    );
}
export default Menu;