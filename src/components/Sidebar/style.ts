import styled, { css } from "styled-components";
import { IconButton } from "../Button";

export const StyledSidebar = styled.div`
    z-index: 10;
    height: 100vh;
    width: 280px;
    overflow: hidden;
    position: absolute;
    background-color: white;

    transition: 0.15s transform, 0.15s box-shadow, 0.10s width;
    will-change: transform;
    transition-timing-function: cubic-bezier(0.54, 0.01, 0, 0.99);

    backdrop-filter: blur(100px);
    background-color: #7b7b7b6e;

    * {
        user-select: none;
    }

    ${({ enabled }: { enabled: boolean }) => css`
        transform: ${enabled ? `translateX()` : `translateX(calc(-20% * 6))`};
        box-shadow: 0px 1px 30px rgba(0,0,0,0.25);
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

export const CoverSheet = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    left: 0;
    background-color: #00000075;
    width: 100%;
    height: 100%;
    z-index: 5;
    display: block;
    overflow: hidden;
    transition: 0.3s opacity;

    ${({ visible }: { visible: boolean }) => css`
        opacity: ${visible ? 1 : 0};
        pointer-events: ${visible ? 'all' : 'none'};
    `}
`;