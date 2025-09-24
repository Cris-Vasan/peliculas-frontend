import React, { useState, useEffect } from 'react'
import { getTipos, createTipo, updateTipo } from '../../service/tipoService'
import { TipoNew } from './TipoNew'
import { TipoEdit } from './TipoEdit'

export const TipoView = () => {
  const [tipos, setTipos] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedTipo, setSelectedTipo] = useState(null)

  const listarTipos = async () => {
    try {
      const { data } = await getTipos()
      setTipos(data)
    } catch (error) {
      console.error("Error al listar tipos:", error)
    }
  }

  const handleSaveTipo = async (formData) => {
    try {
      await createTipo(formData)
      setShowModal(false)
      listarTipos()
      alert('Tipo agregado exitosamente!')
    } catch (error) {
      console.error("Error al crear tipo:", error)
      alert('Error al agregar el tipo')
    }
  }

  const handleEditTipo = (tipo) => {
    setSelectedTipo(tipo)
    setShowEditModal(true)
  }

  const handleUpdateTipo = async (formData) => {
    try {
      await updateTipo(selectedTipo._id, formData)
      setShowEditModal(false)
      setSelectedTipo(null)
      listarTipos()
      alert('Tipo actualizado exitosamente!')
    } catch (error) {
      console.error("Error al actualizar tipo:", error)
      alert('Error al actualizar el tipo')
    }
  }

  useEffect(() => {
    listarTipos()
  }, [])

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title-custom">
            <i className="bi bi-collection me-2"></i>
            Gestión de Tipos
          </h2>
          <button 
            className="btn-primary-custom"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Tipo
          </button>
        </div>

        <div className="card card-custom">
          <div className="card-body">
            {tipos.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-collection" style={{fontSize: '4rem', color: 'var(--secondary-color)'}}></i>
                <h5 className="mt-3 text-muted">No hay tipos registrados</h5>
                <p className="text-muted">Comienza agregando el primer tipo</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{backgroundColor: 'var(--primary-color)', color: 'white'}}>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Descripción</th>
                      <th className="text-center" style={{width: '120px'}}>Creación</th>
                      <th className="text-center" style={{width: '120px'}}>Actualización</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tipos.map((tipo, index) => (
                      <tr key={tipo._id}>
                        <td>{index + 1}</td>
                        <td>
                          <strong className="text-primary">{tipo.nombre}</strong>
                        </td>
                        <td>{tipo.descripcion}</td>
                        <td className="text-center">
                          <small>{tipo.fechaCreacion 
                            ? new Date(tipo.fechaCreacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <small>{tipo.fechaActualizacion 
                            ? new Date(tipo.fechaActualizacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditTipo(tipo)}
                            title="Editar tipo"
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

      {/* Modal para agregar tipo */}
      <TipoNew
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveTipo}
      />

      {/* Modal para editar tipo */}
      <TipoEdit
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setSelectedTipo(null)
        }}
        onSave={handleUpdateTipo}
        tipo={selectedTipo}
      />
    </>
  )
}
