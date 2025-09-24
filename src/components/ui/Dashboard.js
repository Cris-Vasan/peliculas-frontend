import React, { useState, useEffect } from 'react'
import { getMedias } from '../../service/mediaService'
import { getTipos } from '../../service/tipoService'
import { getDirectores } from '../../service/directorService'
import { getProductoras } from '../../service/productoraService'
import { getGeneros } from '../../service/generoService'

export const Dashboard = () => {
  const [stats, setStats] = useState({
    totalMedias: 0,
    totalTipos: 0,
    totalDirectores: 0,
    totalProductoras: 0,
    totalGeneros: 0,
    loading: true
  })

  useEffect(() => {
    loadStatistics()
  }, [])

  const loadStatistics = async () => {
    try {
      const [medias, tipos, directores, productoras, generos] = await Promise.all([
        getMedias(),
        getTipos(),
        getDirectores(),
        getProductoras(),
        getGeneros()
      ])

      setStats({
        totalMedias: medias.data.length,
        totalTipos: tipos.data.length,
        totalDirectores: directores.data.length,
        totalProductoras: productoras.data.length,
        totalGeneros: generos.data.length,
        loading: false
      })
    } catch (error) {
      console.error('Error cargando estadísticas:', error)
      setStats(prev => ({ ...prev, loading: false }))
    }
  }

  if (stats.loading) {
    return (
      <div className="container mt-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Cargando...</span>
          </div>
          <h5 className="mt-3">Cargando estadísticas...</h5>
        </div>
      </div>
    )
  }

  const StatCard = ({ title, count, icon, color, description }) => (
    <div className="col-md-6 col-lg-4 mb-4">
      <div className="card card-custom h-100">
        <div className="card-body text-center">
          <div className={`display-4 mb-3 text-${color}`}>
            <i className={`bi ${icon}`}></i>
          </div>
          <h2 className="display-6 fw-bold text-primary mb-2">{count}</h2>
          <h5 className="card-title">{title}</h5>
          <p className="card-text text-muted">{description}</p>
        </div>
      </div>
    </div>
  )

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="card-title-custom">
          <i className="bi bi-graph-up me-2"></i>
          Dashboard - CineIUD
        </h2>
        <button 
          className="btn btn-outline-primary"
          onClick={loadStatistics}
          title="Actualizar estadísticas"
        >
          <i className="bi bi-arrow-clockwise me-2"></i>
          Actualizar
        </button>
      </div>

      <div className="row">
        <StatCard
          title="Películas y Series"
          count={stats.totalMedias}
          icon="bi-film"
          color="primary"
          description="Total de contenido audiovisual registrado"
        />
        
        <StatCard
          title="Géneros"
          count={stats.totalGeneros}
          icon="bi-tags"
          color="success"
          description="Clasificaciones de género disponibles"
        />
        
        <StatCard
          title="Directores"
          count={stats.totalDirectores}
          icon="bi-person-video2"
          color="info"
          description="Directores registrados en el sistema"
        />
        
        <StatCard
          title="Productoras"
          count={stats.totalProductoras}
          icon="bi-building"
          color="warning"
          description="Casas productoras registradas"
        />
        
        <StatCard
          title="Tipos de Contenido"
          count={stats.totalTipos}
          icon="bi-collection"
          color="secondary"
          description="Categorías de contenido definidas"
        />

        <div className="col-md-6 col-lg-4 mb-4">
          <div className="card card-custom h-100 bg-light">
            <div className="card-body text-center">
              <div className="display-4 mb-3 text-primary">
                <i className="bi bi-star"></i>
              </div>
              <h5 className="card-title">Sistema Completo</h5>
              <p className="card-text">
                Gestión integral de contenido audiovisual con {' '}
                <strong>{stats.totalMedias + stats.totalTipos + stats.totalDirectores + stats.totalProductoras + stats.totalGeneros}</strong>
                {' '} registros totales
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-12">
          <div className="card card-custom">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                <i className="bi bi-info-circle me-2"></i>
                Acciones Rápidas
              </h5>
            </div>
            <div className="card-body">
              <div className="row text-center">
                <div className="col-md-3 mb-3">
                  <a href="/media" className="btn btn-outline-primary w-100">
                    <i className="bi bi-plus-circle me-2"></i>
                    Nueva Película
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/tipo" className="btn btn-outline-secondary w-100">
                    <i className="bi bi-collection me-2"></i>
                    Gestionar Tipos
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/director" className="btn btn-outline-info w-100">
                    <i className="bi bi-person-video2 me-2"></i>
                    Ver Directores
                  </a>
                </div>
                <div className="col-md-3 mb-3">
                  <a href="/genero" className="btn btn-outline-success w-100">
                    <i className="bi bi-tags me-2"></i>
                    Gestionar Géneros
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
