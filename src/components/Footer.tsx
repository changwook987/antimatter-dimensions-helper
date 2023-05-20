import { styled } from "styled-components";

const StyledFooter = styled.footer`
    width: 100vw;
    height: 10vh;
`;

export const Footer = () => {
    return (
        <StyledFooter>
            트리를 만드는 코드는{" "}
            <a href="https://github.com/earthernsence/ADAnswers-Bot">여기</a>
            에서 가져왔습니다
        </StyledFooter>
    );
};
