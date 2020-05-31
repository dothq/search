import React from 'react';

import { StyledSidebar, SidebarContainer, Spacer, DarkModeToggle } from "./style";
import { Flexy } from '../Flexy';
import { IconButton } from '../Button';
import { Icon } from '../Icon';
import { Item } from '../Item';

export const Sidebar = ({ enabled }: { enabled: boolean }) => (
    <StyledSidebar enabled={enabled}>
        <SidebarContainer>
            <Flexy jc={"flex-start"}>
                <IconButton size={32}>
                    <Icon icon={"menu"} size={18} />
                </IconButton>
            </Flexy>
            <Spacer />
            <Item href={"#"}>About Dot Search</Item>
            <Item href={"#"}>Privacy</Item>
            <Item href={"#"}>Terms</Item>
            <DarkModeToggle>
                <Flexy jc={"flex-start"}>
                    <IconButton size={32}>
                        <Icon icon={"moon"} size={18} />
                    </IconButton>
                </Flexy>
                <Item href={"#"}>Toggle Night Theme</Item>
            </DarkModeToggle>
        </SidebarContainer>
    </StyledSidebar>
)