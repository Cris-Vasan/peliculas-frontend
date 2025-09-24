import React from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { NavLink } from 'react-router-dom';

// Estilos para el enlace activo
const activeStyle = {
  backgroundColor: 'rgba(74, 20, 140, 0.3)', // Difuminación del morado
  color: '#fff',
  fontWeight: 'bold',
  borderRadius: '8px',
  transform: 'scale(1.05)',
  boxShadow: '0 2px 12px rgba(74, 20, 140, 0.5)',
  border: '2px solid rgba(255, 255, 255, 0.4)'
};

export const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark" style={{backgroundColor: '#4a148c'}}>
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">CineIUD</NavLink>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">

            <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  activeStyle={activeStyle}
                  exact to="/"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className="bi bi-play-circle me-2"></i>Media
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  activeStyle={activeStyle}
                  exact to="/tipo"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className="bi bi-collection me-2"></i>Tipo
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  activeStyle={activeStyle}
                  exact to="/genero"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className="bi bi-tags me-2"></i>Genero
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  activeStyle={activeStyle}
                  exact to="/productora"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className="bi bi-building me-2"></i>Productora
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink 
                  className="nav-link" 
                  activeStyle={activeStyle}
                  exact to="/director"
                  style={{transition: 'all 0.3s ease'}}
                >
                  <i className="bi bi-person-video2 me-2"></i>Director
                </NavLink>
            </li>

          </ul>
        </div>
      </div>
    </nav>
  )
}


