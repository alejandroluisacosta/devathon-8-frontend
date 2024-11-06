import { NavLink } from 'react-router-dom';
import { SIDE_BAR } from '../../../constants/routes';
import './sideBar.scss';

export const SideBar = () => {
  return (
    <aside className="aside">
      <h1 className="aside__logo">LOGO</h1>
      <nav className="side-bar">
        <ul className="side-bar__links">
          {SIDE_BAR.map((link) => (
            <li key={link.title}>
              <NavLink className={({ isActive }) => `side-bar__link ${isActive && 'active'}`} to={link.path}>
                {link.icon}
                <span className="side-bar__title">{link.title}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
