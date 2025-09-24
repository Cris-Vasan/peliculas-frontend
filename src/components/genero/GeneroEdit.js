import React, { useState, useEffect } from 'react'

export const GeneroEdit = ({ show, onHide, onSave, genero }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    estado: true
  })

  // Cargar datos cuando se muestre el modal y haya género seleccionado
  useEffect(() => {
    if (show && genero) {
      setFormData({
        nombre: genero.nombre || '',
        descripcion: genero.descripcion || '',
        estado: genero.estado !== undefined ? genero.estado : true
      })
    }
  }, [show, genero])

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
  }

  if (!show || !genero) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-pencil me-2"></i>
              Editar Género: {genero.nombre}
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
                ></textarea>
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
                Actualizar Género
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
