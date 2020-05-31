import styled, { css } from "styled-components";
import { IconButton } from "../Button";

export const StyledSidebar = styled.div`
    z-index: 1;
    height: 100vh;
    width: 280px;
    overflow: hidden;
    position: fixed;
    background-color: white;

    transition: 0.15s transform, 0.15s box-shadow;
    will-change: transform;
    transition-timing-function: cubic-bezier(0.54, 0.01, 0, 0.99);

    backdrop-filter: blur(100px);
    background-color: #7b7b7b6e;

    ${({ enabled }: { enabled: boolean }) => css`
        transform: ${enabled ? `translateX()` : `translateX(calc(-20% * 6))`};
        box-shadow: 0px 1px 30px rgba(0,0,0,0.25)${enabled ? `, 1px 0px 0 11520px #0000007a` : ``};
    `}
`;

export const SidebarContainer = styled.div`
    padding: 32px;
    padding-top: 20px;
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
        background-color: #eeeeee2b;
    }
`;

export const SidebarIconButton = styled(IconButton)`
    background-color: transparent;
    box-shadow: none;
    color: #fff;
`;