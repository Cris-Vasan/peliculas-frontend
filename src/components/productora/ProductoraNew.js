import React, { useState } from 'react'

export const ProductoraNew = ({ show, onHide, onSave }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    slogan: '',
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
      slogan: '',
      descripcion: '',
      estado: 'Activo'
    })
  }

  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Nueva Productora
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body modal-body-custom">
              <div className="row">
                <div className="col-md-8">
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
                      placeholder="Ej. Warner Bros, Disney, Netflix"
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="mb-3 form-check mt-4 pt-2">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="estado"
                      name="estado"
                      checked={formData.estado === 'Activo'}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="estado">
                      Productora activa
                    </label>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="slogan" className="form-label">Slogan</label>
                <input
                  type="text"
                  className="form-control form-control-custom"
                  id="slogan"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleChange}
                  placeholder="Eslogan o frase característica de la productora"
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
                  placeholder="Descripción de la productora audiovisual"
                ></textarea>
              </div>
            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Guardar Productora
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
