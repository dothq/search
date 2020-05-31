import styled from "styled-components";

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
`;

export const Logo = styled.div`
    width: 72px;
    height: 72px;
    background-image: url(/icon.png);
    background-size: contain;
`;

export const Searchbox = styled.input`
    background: #FFFFFF;
    box-shadow: 0px 1px 30px rgba(0,0,0,0.25);
    border-radius: 8px;
    border: none;
    outline: none;
    height: 38px;
    width: 680px;
    margin-top: 88px;
    font-size: 14px;
    padding-left: 40px;
    background-image: url(/search.svg);
    background-size: 16px;
    background-repeat: no-repeat;
    background-position-x: 12px;
    background-position-y: 11px;
`;