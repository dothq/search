import styled from "styled-components";

export const StyledNews = styled.div`
    width: 100%;
    height: 58px;
    display: flex;
    position: absolute;
    bottom: 0;
    border-top: 1px solid #b8b8b8;
    font-size: 15px;
    background-color: #ffffffc4;
    backdrop-filter: blur(10px);
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