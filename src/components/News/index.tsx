import React from 'react';

import { StyledNews, Container } from "./style";
import { Button } from '../Button';

import axios from 'axios';

import { useGlobalState } from '../../context'
import { navigate } from 'gatsby';

export const News = () => {
    const [news, setNews] = useGlobalState('news')

    React.useState(() => {
        if(news == undefined) {
            axios.get('https://dothq.co/api/browser.news', { headers: { 'X-Dot-NTP': true } })
                .then(res => setNews(res.data.articles))
        }
    })

    const loadArticle = (url) => {
        if(typeof(window) !== "undefined") {
            document.location.replace(url)
        }
    }

    return (
        <StyledNews>
            <Container style={{ display: 'block' }}>
                {news && news[0] && news[0].title} <a onClick={() => loadArticle(news && news[0] && news[0].url)} style={{ color: '#0E8BFF', cursor: 'pointer' }}>  -> Learn more</a>
            </Container>
        </StyledNews>
    )
}
