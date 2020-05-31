import React from 'react';

import { StyledLanding, Container, Logo, Searchbox } from "./style";
import { Button } from '../Button';
import { News } from '../News';

import { useGlobalState } from '../../context'
import { navigate } from 'gatsby';

export const Landing = ({ location }) => {
    if(!location) {
        document.documentElement.style.backgroundImage = `url(https://source.unsplash.com/1920x1080?landscapes)`
    }

    let [logoClicksCount, setLogoClicksCount] = useGlobalState('logoClicks')

    const onLogoClick = () => {
        if(logoClicksCount == 0) {
            return setLogoClicksCount(-1)
        }

        setLogoClicksCount(++logoClicksCount)
    }

    const onSearch = () => {
        const sb = (document.getElementById("sb") as HTMLInputElement)
        
        navigate(`/search?q=${sb.value}`, { replace: false })
    }

    const onKeyDown = (e) => {
        if(e.keyCode == 13) {
            onSearch()
        }
    }

    return (
        <StyledLanding>
            <Container>
                <Logo onClick={onLogoClick} animate={logoClicksCount == 0} />
                <Searchbox 
                    placeholder={""} 
                    id={"sb"} 
                    onKeyDown={() => onKeyDown(event)} 
                    autoCapitalize={"off"}
                    autoComplete={"off"}
                    autoCorrect={"off"}
                    autoFocus={false}
                />
                <div style={{ marginTop: '44px', display: 'flex' }}>
                    <Button style={{ marginRight: '18px' }} onClick={onSearch}>Search</Button>
                    <Button>Something random</Button>
                </div>
            </Container>
        </StyledLanding>
    )
}