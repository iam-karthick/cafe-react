import { Link, useMatch, useResolvedPath } from "react-router-dom"
import './style.model.css';

export default function Navbar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
      Café Management portal
      </Link>
      <ul>
        <CustomLink to="/">Café</CustomLink>
        <CustomLink to="/employee">Employee</CustomLink>
      </ul>
    </nav>
  )
}

function CustomLink({ to, children, ...props }) {
  const resolvedPath = useResolvedPath(to)
  const isActive = useMatch({ path: resolvedPath.pathname, end: true })

  return (
    <li className={isActive ? "active" : ""}>
      <Link to={to} {...props}>
        {children}
      </Link>
    </li>
  )
}
