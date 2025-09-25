import React, { useState, useEffect } from 'react'

export const DirectorEdit = ({ show, onHide, onSave, director }) => {
  const [formData, setFormData] = useState({
    nombres: '',
    estado: true
  })

  // Cargar datos cuando se muestre el modal y haya director seleccionado
  useEffect(() => {
    if (show && director) {
      setFormData({
        nombres: director.nombres || '',
        estado: director.estado || 'Activo'
      })
    }
  }, [show, director])

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
  }

  if (!show || !director) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-pencil me-2"></i>
              Editar Director: {director.nombres}
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
                />
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
                Actualizar Director
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
