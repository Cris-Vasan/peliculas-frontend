import React, { useState, useEffect } from 'react'

export const ProductoraEdit = ({ show, onHide, onSave, productora }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    slogan: '',
    descripcion: '',
    estado: 'Activa'
  })

  // Cargar datos cuando se muestre el modal y haya productora seleccionada
  useEffect(() => {
    if (show && productora) {
      setFormData({
        nombre: productora.nombre || '',
        slogan: productora.slogan || '',
        descripcion: productora.descripcion || '',
        estado: productora.estado || 'Activa'
      })
    }
  }, [show, productora])

  const handleChange = (e) => {
    let value = e.target.value
    if (e.target.type === 'checkbox') {
      value = e.target.checked ? 'Activa' : 'Inactiva'
    }
    setFormData({
      ...formData,
      [e.target.name]: value
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("📋 Datos del formulario de productora antes de enviar:", formData)
    onSave(formData)
  }

  if (!show || !productora) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-pencil me-2"></i>
              Editar Productora: {productora.nombre}
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
                      checked={formData.estado === 'Activa'}
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
            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Actualizar Productora
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
