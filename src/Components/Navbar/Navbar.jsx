import React from 'react';
import { Link } from 'react-router-dom';

const PAGES = [
  { label: 'Home', destination: '/' },
  { label: 'Categories', destination: '/categories' },
  { label: 'Users', destination: '/users' },
  { label: 'Journals', destination: '/journals' },
];

function Navbar() {

  const location = useLocation();

  const mapper = (page) => (
    <li key={page.destination} className={location.pathname === page.destination ? 'active' : ''}>
      <Link to={page.destination}>
        {page.label}
      </Link>
    </li>
  );

  return (
    <nav>
      <ul>
        {PAGES.map(mapper)}
      </ul>
    </nav>
  );
}

export default Navbar;
