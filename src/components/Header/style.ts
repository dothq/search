import styled from "styled-components";

export const StyledHeader = styled.div`
    height: 72px;
    width: 100%;
    overflow: hidden;
    display: flex;
`;

export const HeaderContainer = styled.div`
    height: 32px;
    display: flex;
    width: 100%;
    align-self: center;
    padding: 0 32px;
    padding-left: 50px;
`;

export const Logo = styled.div`
    width: 32px;
    height: 32px;
    background-image: url(/icon.png);
    background-size: contain;
    margin-right: 15px;
`;