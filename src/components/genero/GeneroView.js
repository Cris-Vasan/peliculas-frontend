import React, { useState, useEffect } from 'react'
import { getGeneros, createGenero, updateGenero } from '../../service/generoService'
import { GeneroNew } from './GeneroNew'
import { GeneroEdit } from './GeneroEdit'

export const GeneroView = () => {
  const [generos, setGeneros] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedGenero, setSelectedGenero] = useState(null)

  const listarGeneros = async () => {
    try {
      const { data } = await getGeneros()
      setGeneros(data)
    } catch (error) {
      console.error("Error al listar géneros:", error)
    }
  }

  const handleSaveGenero = async (formData) => {
    try {
      await createGenero(formData)
      setShowModal(false)
      listarGeneros()
      alert('Género agregado exitosamente!')
    } catch (error) {
      console.error("Error al crear género:", error)
      alert('Error al agregar el género')
    }
  }

  const handleEditGenero = (genero) => {
    setSelectedGenero(genero)
    setShowEditModal(true)
  }

  const handleUpdateGenero = async (formData) => {
    try {
      await updateGenero(selectedGenero._id, formData)
      setShowEditModal(false)
      setSelectedGenero(null)
      listarGeneros()
      alert('Género actualizado exitosamente!')
    } catch (error) {
      const errorMsg = error.response?.data?.message || error.message || 'Error desconocido'
      alert(`Error al actualizar el género: ${errorMsg}`)
    }
  }

  useEffect(() => {
    listarGeneros()
  }, [])

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title-custom">
            <i className="bi bi-tags me-2"></i>
            Gestión de Géneros
          </h2>
          <button 
            className="btn-primary-custom"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Género
          </button>
        </div>

        <div className="card card-custom">
          <div className="card-body">
            {generos.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-tags" style={{fontSize: '4rem', color: 'var(--secondary-color)'}}></i>
                <h5 className="mt-3 text-muted">No hay géneros registrados</h5>
                <p className="text-muted">Comienza agregando el primer género</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{backgroundColor: 'var(--primary-color)', color: 'white'}}>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th className="text-center" style={{width: '120px'}}>Creación</th>
                      <th className="text-center" style={{width: '120px'}}>Actualización</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {generos.map((genero, index) => (
                      <tr 
                        key={genero._id}
                        style={{
                          opacity: genero.estado === 'Activo' ? 1 : 0.6,
                          backgroundColor: genero.estado === 'Activo' ? 'transparent' : '#f8f9fa'
                        }}
                      >
                        <td>{index + 1}</td>
                        <td>
                          <strong className={genero.estado === 'Activo' ? 'text-primary' : 'text-muted'}>
                            {genero.nombre}
                          </strong>
                        </td>
                        <td>{genero.descripcion}</td>
                        <td>
                          <span className={`badge ${genero.estado === 'Activo' ? 'badge-primary-custom' : 'badge-secondary-custom'}`}>
                            {genero.estado || 'Inactivo'}
                          </span>
                        </td>
                        <td className="text-center">
                          <small>{genero.fechaCreacion 
                            ? new Date(genero.fechaCreacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <small>{genero.fechaActualizacion 
                            ? new Date(genero.fechaActualizacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditGenero(genero)}
                            title="Editar género"
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

      {/* Modal para agregar género */}
      <GeneroNew
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveGenero}
      />

      {/* Modal para editar género */}
      <GeneroEdit
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setSelectedGenero(null)
        }}
        onSave={handleUpdateGenero}
        genero={selectedGenero}
      />
    </>
  )
}
