import React, { useState } from 'react'

export const GeneroNew = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: 'Activo'
  })

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 'Activo' : 'Inactivo'
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    onSave(formData)
    // Limpiar formulario
    setFormData({
      nombre: '',
      descripcion: '',
      estado: 'Activo'
    })
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Nuevo Género
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body modal-body-custom">
              <div className="mb-3">
                <label htmlFor="nombre" className="form-label">Nombre *</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Acción, Drama, Comedia, Terror"
                />
              </div>

              <div className="mb-3">
                <label htmlFor="descripcion" className="form-label">Descripción</label>
                <textarea
                  className="form-control form-control-custom"
                  id="descripcion"
                  name="descripcion"
                  rows="3"
                  value={formData.descripcion}
                  onChange={handleChange}
                  placeholder="Descripción del género cinematográfico"
                ></textarea>
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="estado"
                  name="estado"
                  checked={formData.estado === 'Activo'}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="estado">
                  Género activo
                </label>
              </div>
            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Guardar Género
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
