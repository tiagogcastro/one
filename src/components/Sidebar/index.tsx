import { useState } from 'react';
import { BsHouseDoor } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import * as Styles from './styles';

export function SideBar() {
  const [sideBar, setSideBar] = useState(false);

  function handleChangeSideBar() {
    setSideBar((prevState) => !prevState);
  }

  return (
    <Styles.Container>
      <Styles.Content>
        {!sideBar ? (
          <Styles.ClosedSideBar onMouseEnter={handleChangeSideBar}>
            <nav className="sidebar_principal_links">
              <ul>
                <Link to="/dashboard" title="Dashboard">
                  <BsHouseDoor />
                </Link>
                <Link to="/" title="Lista de usuários">
                  <FiUsers />
                </Link>
              </ul>
            </nav>
          </Styles.ClosedSideBar>
        ) : (
          <Styles.OpenSideBar>
            <section>
              <nav className="sidebar_principal_links">
                <ul>
                  <Link to="/dashboard" title="Dashboard">
                    <BsHouseDoor />
                    Dashboard
                  </Link>
                  <Link to="/" title="Usuários da empresa">
                    <FiUsers />
                    Usuários da empresa
                  </Link>
                </ul>
              </nav>
            </section>
            <button onClick={handleChangeSideBar} />
          </Styles.OpenSideBar>
        )}
      </Styles.Content>
    </Styles.Container>
  );
}
