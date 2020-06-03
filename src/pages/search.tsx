import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { parse } from "search-params"
import axios from "axios"

import { useGlobalState } from '../context'

import { sanitize } from 'dompurify';

const cleanHTML = (dirtyHTML) => {
    const html = dirtyHTML.replace(/\[b\]/g, "<b style='font-weight: 600'>").replace(/\[\/b\]/g, "</b>")

    return sanitize(html, {ALLOWED_TAGS: ['b']})
}

const SearchResultsPage = ({ location }) => {
    let [results, setResults] = useGlobalState('results')

    const [title, setTitle] = React.useState(`- Dot Search`)

    React.useState(() => {
        if(typeof(window) !== "undefined" && location) {
            const parsed = parse(location.href);

            setTitle((parsed.q as string) || "")

            if((results as any).query == parsed.q) return;
            const url = process.env.NODE_ENV == 'development' ? 'http://localhost:9015/v1/search' : '/api/v1/search'

            axios.post(url, { query: parsed.q })
                .then(res => setResults(res.data))
        }
    })

    return (
        <Layout isResults>
            <SEO title={title} />
            <div style={{ textAlign: 'left', margin: '118px', width: '652px' }}>
                {(results as any).results && (
                    <>
                        <p style={{ fontSize: '14px' }}>Took {(results as any).timeTaken/1000} seconds</p>
                        {(results as any).results && (results as any).results.map(result => (
                            <div style={{ marginBottom: '28px' }}>
                                <div style={{ display: 'flex', fontSize: '14px', height: '28px' }}>
                                    <span style={{ overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{result.url.prettified.join(" › ")}</span>
                                </div>
                                <a className={"se-link"} href={result.url.url} style={{ color: '#1a0dab' }}>
                                    <h3 style={{ 
                                        fontSize: '20px', 
                                        marginBottom: '4px', 
                                        fontWeight: 400, 
                                        width: '625px', 
                                        overflow: 'hidden', 
                                        whiteSpace: 'nowrap', 
                                        textOverflow: 'ellipsis' 
                                    }} dangerouslySetInnerHTML={{ __html: cleanHTML(result.title) }} />
                                </a>
                                <div 
                                    style={{ 
                                        fontSize: '14px'
                                    }} 
                                    dangerouslySetInnerHTML={{ __html: cleanHTML(result.content) }}
                                />
                            </div>
                        ))}
                    </>
                )}
            </div>
        </Layout>
    )
}

export default SearchResultsPage
