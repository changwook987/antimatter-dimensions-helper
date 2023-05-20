import { NavLink } from "react-router-dom";
import styled from "styled-components";

const Nav = styled.nav`
    width: 100vw;
    height: 10vh;
    display: inline-flex;
    justify-content: center;
    align-items: center;
`;

const Link = styled(NavLink)`
    font-weight: bold;
    font-size: 3em;
    color: black;
    text-decoration: none;
    display: inline-block;
    padding: 5px;
    margin-left: 1rem;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
`;

export const Navigation = () => {
    return (
        <Nav>
            <Link to="/">Home</Link>
            <Link to="/ts">TimeStudy</Link>
            <Link to="/ec">EternityChallenge</Link>
        </Nav>
    );
};
