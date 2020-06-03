import styled, { css } from "styled-components";

export const StyledLanding = styled.div`
    width: 100%;
    height: calc(100vh - 72px);
    display: flex;

    @media screen and (max-width: 800px) {
        & {
           height: calc(-webkit-fill-available - 72px);
        }
    }
`;

export const Container = styled.div`
    text-align: center;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    transform-y: translate(-50%, -50%); 
    align-self: center;
`;

export const Logo = styled.div`
    width: 72px;
    height: 72px;
    background-image: url(/icon_light.png);
    background-size: contain;
`;

