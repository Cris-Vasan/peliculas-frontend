import React, { useState, useEffect } from 'react'
import { getProductoras, createProductora, updateProductora } from '../../service/productoraService'
import { ProductoraNew } from './ProductoraNew'
import { ProductoraEdit } from './ProductoraEdit'

export const ProductoraView = () => {
  const [productoras, setProductoras] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProductora, setSelectedProductora] = useState(null)

  const listarProductoras = async () => {
    try {
      const { data } = await getProductoras()
      setProductoras(data)
    } catch (error) {
      console.error("Error al listar productoras:", error)
    }
  }

  const handleSaveProductora = async (formData) => {
    try {
      await createProductora(formData)
      setShowModal(false)
      listarProductoras()
      alert('Productora agregada exitosamente!')
    } catch (error) {
      console.error("Error al crear productora:", error)
      alert('Error al agregar la productora')
    }
  }

  const handleEditProductora = (productora) => {
    setSelectedProductora(productora)
    setShowEditModal(true)
  }

  const handleUpdateProductora = async (formData) => {
    try {
      await updateProductora(selectedProductora._id, formData)
      setShowEditModal(false)
      setSelectedProductora(null)
      listarProductoras()
      alert('Productora actualizada exitosamente!')
    } catch (error) {
      const errorMsg = error.response?.data?.message || 
                      (error.response?.data?.errors && error.response.data.errors[0]?.msg) || 
                      error.message || 'Error desconocido'
      alert(`Error al actualizar la productora: ${errorMsg}`)
    }
  }

  useEffect(() => {
    listarProductoras()
  }, [])

  return (
    <>
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="card-title-custom">
            <i className="bi bi-building me-2"></i>
            Gestión de Productoras
          </h2>
          <button 
            className="btn-primary-custom"
            onClick={() => setShowModal(true)}
          >
            <i className="bi bi-plus-circle me-2"></i>
            Agregar Productora
          </button>
        </div>

        <div className="card card-custom">
          <div className="card-body">
            {productoras.length === 0 ? (
              <div className="text-center py-5">
                <i className="bi bi-building" style={{fontSize: '4rem', color: 'var(--secondary-color)'}}></i>
                <h5 className="mt-3 text-muted">No hay productoras registradas</h5>
                <p className="text-muted">Comienza agregando la primera productora</p>
              </div>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead style={{backgroundColor: 'var(--primary-color)', color: 'white'}}>
                    <tr>
                      <th>#</th>
                      <th>Nombre</th>
                      <th>Slogan</th>
                      <th>Descripción</th>
                      <th>Estado</th>
                      <th className="text-center" style={{width: '110px'}}>Creación</th>
                      <th className="text-center" style={{width: '110px'}}>Actualización</th>
                      <th className="text-center">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productoras.map((productora, index) => (
                      <tr key={productora._id}>
                        <td>{index + 1}</td>
                        <td>
                          <strong className="text-primary">{productora.nombre}</strong>
                        </td>
                        <td>
                          <em className="text-muted">{productora.slogan}</em>
                        </td>
                        <td>{productora.descripcion}</td>
                        <td>
                          <span className={`badge ${productora.estado === 'Activa' ? 'badge-primary-custom' : 'badge-secondary-custom'}`}>
                            {productora.estado || 'Inactiva'}
                          </span>
                        </td>
                        <td className="text-center">
                          <small>{productora.fechaCreacion 
                            ? new Date(productora.fechaCreacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <small>{productora.fechaActualizacion 
                            ? new Date(productora.fechaActualizacion).toLocaleDateString() 
                            : 'N/A'
                          }</small>
                        </td>
                        <td className="text-center">
                          <button 
                            className="btn btn-sm btn-outline-primary"
                            onClick={() => handleEditProductora(productora)}
                            title="Editar productora"
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

      {/* Modal para agregar productora */}
      <ProductoraNew
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveProductora}
      />

      {/* Modal para editar productora */}
      <ProductoraEdit
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false)
          setSelectedProductora(null)
        }}
        onSave={handleUpdateProductora}
        productora={selectedProductora}
      />
    </>
  )
}
