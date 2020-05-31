import styled, { css } from "styled-components";

export const StyledSidebar = styled.div`
    z-index: 1;
    height: 100vh;
    width: 20%;
    overflow: hidden;
    box-shadow: 0px 1px 30px rgba(0,0,0,0.25);
    position: fixed;
    background-color: white;
    ${({ enabled }: { enabled: boolean}) => css`
        display: ${enabled ? 'flex' : 'none'}
    `
}
`;

export const SidebarContainer = styled.div`
    padding: 32px;
`;

export const Spacer = styled.div`
    margin: 22px;
`;

export const DarkModeToggle = styled.div`
    position: absolute;
    bottom: 0;
    display: flex;
    flex-direction: row;
    margin-top: auto;
    margin-bottom: 32px;
    border-radius: 2px;
    transition: 0.3s background-color;
    padding-right: 10px;
    align-items: center;
    justify-content: center;

    &:hover {
        background-color: #eeeeee;
    }
`;