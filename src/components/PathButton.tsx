import { PropsWithChildren } from "react";
import styled from "styled-components";

interface PathButtonProps extends PropsWithChildren {
    color?: string;
    onClick?: () => void;
}

const StyledPathButton = styled.button`
    font-weight: bold;
    font-size: 3em;
    padding: 0.5em;
    border-radius: 5px;
    margin: 1rem;
    background: ${(props) => props.color || "gray"};
    transition: 0.2s;
    width: 5em;

    &:hover {
        transform: scale(1.1);
    }
`;

export const PathButton = (props: PathButtonProps) => {
    return (
        <StyledPathButton color={props.color} onClick={props.onClick}>
            {props.children}
        </StyledPathButton>
    );
};
