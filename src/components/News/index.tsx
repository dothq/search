import React from 'react';

import { StyledNews, Container } from "./style";
import { Button } from '../Button';

import axios from 'axios';

export const News = () => {
    const [news, setNews] = React.useState([])

    React.useState(() => {
        axios.get('https://dothq.co/api/browser.news', { headers: { 'X-Dot-NTP': true } })
            .then(res => setNews(res.data.articles))
    })

    return (
        <StyledNews>
            <Container style={{ display: 'block' }}>
                <b>NEWS</b> {news && news[0] && news[0].title}
            </Container>
        </StyledNews>
    )
}