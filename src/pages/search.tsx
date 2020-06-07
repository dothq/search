import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { parse } from "search-params"
import axios from "axios"

import { useGlobalState } from '../context'

import { Result } from "../components/Result"
import { Icon } from "../components/Icon"
import { parseCIDR } from "ipaddr.js"
import { Button } from "../components/Button"


const SearchResultsPage = ({ location }) => {
    let [results, setResults] = useGlobalState('results')

    const [title, setTitle] = React.useState(`- Dot Search`)

    React.useState(() => {
        if(typeof(window) !== "undefined" && location) {
            const parsed = parse(location.href);

            setTitle((parsed.q as string) || "")
            
            if ((results as any).query == parsed.q) { return; }
            const url = process.env.NODE_ENV == 'development' ? `http://localhost:9015/v1/search/${parsed.stype || ''}` : `/api/v1/search/${parsed.stype || ''}}`

            axios.post(url, { query: parsed.q })
                .then(res => setResults(res.data))
        }
    })

    return (
        <Layout isResults searchbarPlaceholder={parse(location.href).q}>
            <SEO title={title} />
            <div style={{ textAlign: 'left', marginTop: '79px', marginLeft: '118px', marginBottom: '10px', display: 'flex' }}>
                <div style={{ borderBottom: '2px solid #151515', display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"globe"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>All</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"image"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Images</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"film"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Videos</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"rss"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>News</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"map"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Maps</h5>
                </div>
                <div style={{ display: 'flex', marginRight: '20px' }}>
                    <Icon icon={"more-vertical"} size={16}></Icon>
                    <h5 style={{ marginBottom: '5px', marginLeft: '5px', fontWeight: 'normal' }}>Other</h5>
                </div>
            </div>
            <div style={{ display: 'flex' }}>
            <div style={{ textAlign: 'left', margin: '118px', marginTop: '0', marginBottom: '30px', width: '652px' }}>
                {(results as any).results && (
                    <>
                        <p style={{ fontSize: '14px' }}>Took {(results as any).timeTaken/1000} seconds</p>
                        {(results as any).results && (results as any).results.map(result => (
                            <Result result={result} />
                        ))}
                        <div style={{ bottom: '0', marginBottom: '59px', display: 'flex' }}>
                            <Icon icon={"chevron-left"} size={18} style={{ marginTop: '1px', marginRight: '15px', color: '#929292' }}/>
                            <h3 style={{ fontWeight: 'bold', fontSize: '18px', marginRight: '10px' }}>1</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>2</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>3</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>4</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>5</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>6</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>7</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>8</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', marginRight: '10px', color: '#929292' }}>9</h3>
                            <h3 style={{ fontWeight: 'normal', fontSize: '18px', color: '#929292' }}>10</h3>
                            <Icon icon={"chevron-right"} size={18} style={{ marginTop: '1px', marginLeft: '15px' }}/>
                        </div>
                    </>   
                )}
            </div>
            <div style={{ width: '27%', boxShadow: '0px 1px 10px rgba(0, 0, 0, 0.25)', height: '10%', display: 'flex', padding: '20px' }}>
                <div style={{ width: '72px', height: '72px', backgroundImage: 'url(/icon.png)',backgroundSize: 'contain', backgroundRepeat: 'no-repeat', marginRight: '15px' }} />
                <div style={{ justifyContent: 'flex-end' }}>
                    <h4 style={{ fontWeight: 'normal', fontSize: '16px', marginBottom: '4px' }}>Download Dot Browser</h4>
                    <p style={{ fontSize: '12px', marginBottom: '4px' }}>The privacy-based web browser, with adblock and privacy tools built-in to keep you secure online</p>
                    <div style={{ display: 'flex', flexDirection: 'row' }}>
                        <Button style={{ marginRight: '10px' }}>Never Show Again</Button>
                        <Button style={{ backgroundColor: '#000', color: '#fff' }}>Get</Button>
                    </div>
                </div>
            </div>
            </div>
        </Layout>
    )
}

export default SearchResultsPage
