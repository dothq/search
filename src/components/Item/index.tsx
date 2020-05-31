import React from 'react';
import { Link } from 'gatsby';
import { LinkItem, a } from './style'

export const Item = ({ href, children }: {href?: string, children: any}) => (
  <Link to={href}>
      <LinkItem>{children}</LinkItem>
  </Link>
)