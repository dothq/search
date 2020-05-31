import styled, { css } from "styled-components";

export const StyledLanding = styled.div`
    width: 100%;
    height: calc(100vh - 72px);
    display: flex;
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
    background-image: url(/icon.png);
    background-size: contain;

    ${({ animate }: { animate: boolean }) => css`
        animation: ${animate ? `0.3s spin` : ''};
    `}

    @keyframes spin {
        0% {
            transform: rotate(0turn)
        }
        100% {
            transform: rotate(360deg)
        }
    }
`;

export const Searchbox = styled.input`
    background: #ffffffd1;
    box-shadow: 0px 1px 30px rgba(0,0,0,0.25);
    border-radius: 4px;
    border: none;
    outline: none;
    height: 42px;
    width: 680px;
    margin-top: 88px;
    font-size: 14px;
    padding-left: 40px;
    background-image: url(/search.svg);
    background-size: 16px;
    background-repeat: no-repeat;
    background-position-x: 12px;
    background-position-y: 12px;
    backdrop-filter: blur(5px);
`;