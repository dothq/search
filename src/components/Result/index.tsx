import React from 'react';
import { sanitize } from 'dompurify';

import { StyledResult, StyledResultURL, ResultURL, ResultLink, ResultTitle, ResultContent } from './style';

const cleanHTML = (dirtyHTML) => {
  const html = dirtyHTML.replace(/\[b\]/g, "<b style='font-weight: 600'>").replace(/\[\/b\]/g, "</b>")

  return sanitize(html, {ALLOWED_TAGS: ['b']})
}

export const Result = ({ result }) => (
  <StyledResult>
    <StyledResultURL>
      <ResultURL>{result.url.prettified.join(" > ")}</ResultURL>
    </StyledResultURL>
    <ResultLink href={result.url.url} color={'#1a0dab'}>
      <ResultTitle dangerouslySetInnerHTML={{ __html: cleanHTML(result.title) }} />
    </ResultLink>
    <ResultContent dangerouslySetInnerHTML={{ __html: cleanHTML(result.content) }} />
  </StyledResult>
)