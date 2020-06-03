import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { parse } from "search-params"
import axios from "axios"

import { useGlobalState } from '../context'

const SearchResultsPage = ({ location }) => {
    let [results, setResults] = useGlobalState('results')

    const [title, setTitle] = React.useState(`- Dot Search`)

    React.useState(() => {
        if(typeof(window) !== "undefined" && location) {
            const parsed = parse(location.href);

            setTitle((parsed.q as string) || "")

            if((results as any).query == parsed.q) return;
            const url = process.env.ENV == 'development' ? 'http://localhost:9015/v1/search' : '/api/v1/search'

            axios.post(url, { query: parsed.q })
                .then(res => setResults(res.data))
        }
    })

    return (
        <Layout isResults>
            <SEO title={title} />
            <div style={{ textAlign: 'left', margin: '118px' }}>
                {results !== {} && (
                    <>
                        <p>Took {(results as any).timeTaken/1000} seconds</p>
                        {(results as any).results && (results as any).results.map(result => (
                            <div>
                                <div style={{ display: 'flex', fontSize: '14px' }}>
                                    <img src={result.favicon} width={16} />&nbsp;&nbsp;{result.url.prettified.join(" › ")}
                                </div>
                                <h3 style={{ fontSize: '20px' }}>{result.title}</h3>
                                <div style={{ fontSize: '14px' }}>{result.content}</div>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </Layout>
    )
}

export default SearchResultsPage
