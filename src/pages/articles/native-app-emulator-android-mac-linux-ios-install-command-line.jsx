import React from 'react'
import { Link } from 'gatsby'
import BlogTemplate from '../../templates/blog'
import './index.scss';

export default () => (
    <BlogTemplate>
      <Link to='/articles'>back to blogs</Link>
    </BlogTemplate>
);

