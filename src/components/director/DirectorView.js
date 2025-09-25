import React, { useState, useEffect } from 'react'
import { getDirectores, createDirector, updateDirector } from '../../service/directorService'
import { DirectorNew } from './DirectorNew'
import { DirectorEdit } from './DirectorEdit'

export const DirectorView = () => {
  const [directores, setDirectores] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedDirector, setSelectedDirector] = useState(null)

  const listarDirectores = async () => {
    try {
      const { data } = await getDirectores()
      setDirectores(data)
    } catch (error) {
      console.error("Error al listar directores:", error)
    }
  }

  const handleSaveDirector = async (formData) => {
    try {
      await createDirector(formData)
      setShowModal(false)
      listarDirectores()
      alert('Director agregado exitosamente!')
    } catch (error) {
      console.error("Error al crear director:", error)
      alert('Error al agregar el director')
    }
  }

  const handleEditDirector = (director) => {
    setSelectedDirector(director)
    setShowEditModal(true)
  }

  const handleUpdateDirector = async (formData) => {
    try {
      await updateDirector(selectedDirector._id, formData)
      setShowEditModal(false)
      setSelectedDirector(null)
      listarDirectores()
      alert('Director actualizado exitosamente!')
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error desconocido'
      alert(`Error al actualizar el director: ${errorMsg}`)
    }
  }

  useEffect(() => {
    listarDirectores()
  }, [])

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title-custom">
            <i className="bi bi-person-video2 me-2"></i>
            Gestión de Directores
          </h2>
          <button 
            className="btn-primary-custom"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Director
          </button>
        </div>

        <div className="card card-custom">
          <div className="card-body">
            {directores.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-person-video2" style={{fontSize: '4rem', color: 'var(--secondary-color)'}}></i>
                <h5 className="mt-3 text-muted">No hay directores registrados</h5>
                <p className="text-muted">Comienza agregando el primer director</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{backgroundColor: 'var(--primary-color)', color: 'white'}}>
                    <tr>
                      <th>#</th>
                      <th>Nombres</th>
                      <th>Estado</th>
                      <th className="text-center" style={{width: '150px'}}>Creación</th>
                      <th className="text-center" style={{width: '150px'}}>Actualización</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {directores.map((director, index) => (
                      <tr 
                        key={director._id}
                        style={{
                          opacity: director.estado === 'Activo' ? 1 : 0.6,
                          backgroundColor: director.estado === 'Activo' ? 'transparent' : '#f8f9fa'
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <strong className={director.estado === 'Activo' ? 'text-primary' : 'text-muted'}>
                            {director.nombres}
                          </strong>
                        </td>
                        <td>
                          <span className={`badge ${director.estado === 'Activo' ? 'badge-primary-custom' : 'badge-secondary-custom'}`}>
                            {director.estado || 'Inactivo'}
                          </span>
                        </td>
                        <td className="text-center">
                          <small>
                            {director.fechaCreacion ? (
                              <>
                                <div>{new Date(director.fechaCreacion).toLocaleDateString()}</div>
                                <div style={{color: '#6c757d', fontSize: '0.85em'}}>
                                  {new Date(director.fechaCreacion).toLocaleTimeString()}
                                </div>
                              </>
                            ) : 'N/A'}
                          </small>
                        </td>
                        <td className="text-center">
                          <small>
                            {director.fechaActualizacion ? (
                              <>
                                <div>{new Date(director.fechaActualizacion).toLocaleDateString()}</div>
                                <div style={{color: '#6c757d', fontSize: '0.85em'}}>
                                  {new Date(director.fechaActualizacion).toLocaleTimeString()}
                                </div>
                              </>
                            ) : 'N/A'}
                          </small>
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditDirector(director)}
                            title="Editar director"
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modal para agregar director */}
      <DirectorNew
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveDirector}
      />

      {/* Modal para editar director */}
      <DirectorEdit
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setSelectedDirector(null)
        }}
        onSave={handleUpdateDirector}
        director={selectedDirector}
      />
    </>
  )
}
