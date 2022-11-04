import { useState } from 'react';
import { BsHouseDoor } from 'react-icons/bs';
import { FiUsers } from 'react-icons/fi';
import { GoSignOut } from 'react-icons/go';
import { FaUser } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

import * as Styles from './styles';

export function SideBar() {
  const { isUserAdmin, isUserCompanyAdmin, signOut, itsPartOfTheCompany } = useAuth();

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
                {isUserAdmin && (
                  <>
                    <Link to="/admin/dashboard" title="Lista de usuários">
                      <FiUsers />
                    </Link>
                  </>
                )}

                {itsPartOfTheCompany && (
                  <>
                    <Link to="/client/dashboard" title="Dashboard">
                      <BsHouseDoor />
                    </Link>
                    <Link to="/client/users" title="Lista de usuários da empresa">
                      <FiUsers />
                    </Link>
                  </>
                )}

                {isUserCompanyAdmin && <></>}
              </ul>
              <ul>
                <Link to="/profile" title="Meu Perfil">
                  <FaUser />
                </Link>
                <button onClick={signOut}>
                  <GoSignOut />
                </button>
              </ul>
            </nav>
          </Styles.ClosedSideBar>
        ) : (
          <Styles.OpenSideBar>
            <section>
              <nav className="sidebar_principal_links">
                <ul>
                  {isUserAdmin && (
                    <>
                      <Link to="/admin/dashboard" title="Lista de usuários">
                        <FiUsers />
                        Usuários
                      </Link>
                    </>
                  )}

                  {itsPartOfTheCompany && (
                    <>
                      <Link to="/client/dashboard" title="Dashboard">
                        <BsHouseDoor />
                        Dashboard
                      </Link>
                      <Link to="/client/users" title="Lista de usuários da empresa">
                        <FiUsers />
                        Usuários da empresa
                      </Link>
                    </>
                  )}

                  {isUserCompanyAdmin && <></>}
                </ul>
                <ul>
                  <Link to="/profile" title="Meu Perfil">
                    <FaUser />
                    Meu Perfil
                  </Link>
                  <button onClick={signOut}>
                    <GoSignOut /> Sair da conta
                  </button>
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
