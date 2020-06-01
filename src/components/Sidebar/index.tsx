import React from 'react';

import { StyledSidebar, SidebarContainer, Spacer, DarkModeToggle, SidebarIconButton, CoverSheet } from "./style";
import { Flexy } from '../Flexy';
import { IconButton } from '../Button';
import { Icon } from '../Icon';
import { Item } from '../Item';

import { useGlobalState } from '../../context'
import { navigate } from 'gatsby';

import { v4 } from 'uuid';

import axios from 'axios';

export const Sidebar = ({ enabled }: { enabled: boolean }) => {
    const [sidebarVisible, setSidebarVisible] = useGlobalState('sidebarVisible')
    const [bg, setBG] = useGlobalState('bg')

    const [loading, setLoading] = React.useState(false);

    const navigateTo = (e, url) => {
        e.preventDefault()

        setSidebarVisible(false)
        setTimeout(() => {
            navigate(url)
        }, 150);
    }

    const onRefreshWallpaperClick = () => {
        setLoading(true)

        axios.get(`https://source.unsplash.com/featured/1920x1080/?nature`, { responseType: 'arraybuffer', maxRedirects: 0, headers: { 'Cache-Control': 'no-cache' } })
            .then(res => {
                const blob = new Blob([res.data]);
                const data = URL.createObjectURL(blob);
                setBG(data)

                setLoading(false)
                setSidebarVisible(false)
            })
    }

    return (
        <StyledSidebar enabled={enabled}>
            <SidebarContainer>
                <Flexy jc={"flex-start"}>
                    <SidebarIconButton size={32} onClick={() => setSidebarVisible(!sidebarVisible)}>
                        <Icon icon={"menu"} size={18} />
                    </SidebarIconButton>
                </Flexy>
                <Spacer />
                <Item onClick={(e) => onRefreshWallpaperClick()}>Refresh wallpaper {loading && <img style={{ marginTop: '4px', marginLeft: '8px', filter: 'brightness(2.5)', marginBottom: '0px', maxHeight: '16px' }} src={`/loading.gif`} width={"16"} />}</Item>
                <Spacer />
                <Item onClick={(e) => navigateTo(e, "/about")}>About Dot Search</Item>
                <Item onClick={(e) => navigateTo(e, "/privacy")}>Privacy</Item>
                <Item onClick={(e) => navigateTo(e, "/terms")}>Terms</Item>
                <DarkModeToggle>
                    <Flexy jc={"flex-start"}>
                        <SidebarIconButton size={32}>
                            <Icon icon={"moon"} size={18} />
                        </SidebarIconButton>
                    </Flexy>
                    <Item onClick={() => setSidebarVisible(!sidebarVisible)}>Toggle Night Theme</Item>
                </DarkModeToggle>
            </SidebarContainer>
        </StyledSidebar>
    )
}
