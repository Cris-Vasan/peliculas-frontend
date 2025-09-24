import React, { useState } from 'react'

export const DirectorNew = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    estado: true
  })

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
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
      nombres: '',
      estado: true
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
              Agregar Nuevo Director
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body modal-body-custom">
              <div className="mb-3">
                <label htmlFor="nombres" className="form-label">Nombres Completos *</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  id="nombres"
                  name="nombres"
                  value={formData.nombres}
                  onChange={handleChange}
                  required
                  placeholder="Ej. Christopher Nolan"
                />
              </div>

              <div className="mb-3 form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="estado"
                  name="estado"
                  checked={formData.estado}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="estado">
                  Director activo
                </label>
              </div>
            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Guardar Director
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
