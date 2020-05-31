import React from 'react';
import { Link } from 'gatsby';
import { LinkItem, a } from './style'

export const Item = ({ href, children, onClick, style }: { href?: string, children: any; onClick?: any; style?: any }) => (
  <Link to={href} onClick={onClick}>
      <LinkItem style={style}>{children}</LinkItem>
  </Link>
)