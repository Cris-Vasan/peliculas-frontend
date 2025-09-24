import React from 'react'

export const ConfirmModal = ({ show, onHide, onConfirm, title, message, confirmText = "Eliminar", confirmClass = "btn-danger" }) => {
  if (!show) return null

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header border-0">
            <h5 className="modal-title text-danger">
              <i className="bi bi-exclamation-triangle me-2"></i>
              {title || "Confirmar Acción"}
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <div className="modal-body text-center py-4">
            <div className="mb-3">
              <i className="bi bi-question-circle display-1 text-warning"></i>
            </div>
            <p className="mb-0">{message || "¿Está seguro de que desea realizar esta acción?"}</p>
          </div>

          <div className="modal-footer border-0 justify-content-center">
            <button type="button" className="btn btn-secondary me-2" onClick={onHide}>
              <i className="bi bi-x-circle me-2"></i>
              Cancelar
            </button>
            <button type="button" className={`btn ${confirmClass}`} onClick={onConfirm}>
              <i className="bi bi-check-circle me-2"></i>
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
