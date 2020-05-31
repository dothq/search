import React from 'react';

import { StyledSidebar, SidebarContainer, Spacer, DarkModeToggle, SidebarIconButton } from "./style";
import { Flexy } from '../Flexy';
import { IconButton } from '../Button';
import { Icon } from '../Icon';
import { Item } from '../Item';

import { useGlobalState } from '../../context'

export const Sidebar = ({ enabled }: { enabled: boolean }) => {
    const [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')

    return (
        <StyledSidebar enabled={enabled}>
            <SidebarContainer>
                <Flexy jc={"flex-start"}>
                    <SidebarIconButton size={32} onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <Icon icon={"menu"} size={18} />
                    </SidebarIconButton>
                </Flexy>
                <Spacer />
                <Item href={"/about"}>About Dot Search</Item>
                <Item href={"/privacy"}>Privacy</Item>
                <Item href={"/terms"}>Terms</Item>
                <DarkModeToggle>
                    <Flexy jc={"flex-start"}>
                        <SidebarIconButton size={32}>
                            <Icon icon={"moon"} size={18} />
                        </SidebarIconButton>
                    </Flexy>
                    <Item href={"#"}>Toggle Night Theme</Item>
                </DarkModeToggle>
            </SidebarContainer>
        </StyledSidebar>
    )
}