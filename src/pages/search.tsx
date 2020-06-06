import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { parse } from "search-params"
import axios from "axios"

import { useGlobalState } from '../context'

import { Result } from "../components/Result"
import { Icon } from "../components/Icon"


const SearchResultsPage = ({ location }) => {
    let [results, setResults] = useGlobalState('results')

    const [title, setTitle] = React.useState(`- Dot Search`)

    React.useState(() => {
        if(typeof(window) !== "undefined" && location) {
            const parsed = parse(location.href);

            setTitle((parsed.q as string) || "")
            
            if ((results as any).query == parsed.q) { return; }
            const url = process.env.NODE_ENV == 'development' ? 'http://localhost:9015/v1/search' : '/api/v1/search'

            axios.post(url, { query: parsed.q })
                .then(res => setResults(res.data))
        }
    })

    return (
        <Layout isResults searchbarPlaceholder={parse(location.href).q}>
            <SEO title={title} />
            <div style={{ textAlign: 'left', marginTop: '79px', marginLeft: '118px', marginBottom: '10px', display: 'flex' }}>
                <div style={{ borderBottom: '2px solid #151515', display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"globe"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>All</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"image"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Images</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"film"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Videos</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"rss"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>News</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"map"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Maps</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"image"} size={18}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Other</h5>
                </div>
            </div>
            <div style={{ textAlign: 'left', margin: '118px', width: '652px' }}>
                {(results as any).results && (
                    <>
                        <p style={{ fontSize: '14px' }}>Took {(results as any).timeTaken/1000} seconds</p>
                        {(results as any).results && (results as any).results.map(result => (
                            <Result result={result} />
                        ))}
                    </>   
                )}
            </div>
        </Layout>
    )
}

export default SearchResultsPage
