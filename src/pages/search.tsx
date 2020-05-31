import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import { parse } from "search-params"

const SearchResultsPage = ({ location }) => {
    const [title, setTitle] = React.useState(`- Dot Search`)

    React.useState(() => {
        if(location) {
            const parsed = parse(location.href);

            setTitle((parsed.q as string) || "")
        }
    })

    return (
        <Layout>
            <SEO title={title} />
            <div style={{ textAlign: 'center', paddingTop: '28vh' }}>
                <h1 style={{ marginBottom: '8px', fontSize: '4rem', fontWeight: 800 }}>Results</h1>
            </div>
        </Layout>
    )
}

export default SearchResultsPage
