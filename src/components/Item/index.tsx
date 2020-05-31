import React from 'react';
import { Link } from 'gatsby';
import { LinkItem, a } from './style'

export const Item = ({ href, children }: {href?: string, children: any}) => (
  <Link to={href} activeClassName={a}>
      <LinkItem>{children}</LinkItem>
  </Link>
)