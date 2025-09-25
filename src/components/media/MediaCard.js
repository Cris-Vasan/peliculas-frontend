import React from 'react'

export const MediaCard = ({ media, onEdit }) => {
  console.log("🎭 Props recibidas en MediaCard:", media);
  
  return (
    <div className="col">
        <div className="card h-100 card-custom" style={{position: 'relative'}}>
            {/* Botón de editar en esquina superior derecha */}
            <button 
              className="btn btn-sm position-absolute"
              style={{
                top: '8px',
                right: '8px',
                background: 'rgba(108, 117, 125, 0.9)',
                border: 'none',
                color: 'white',
                borderRadius: '50%',
                width: '32px',
                height: '32px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 10,
                transition: 'all 0.2s ease'
              }}
              onClick={() => onEdit && onEdit(media)}
              title="Editar película"
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(108, 117, 125, 1)';
                e.target.style.transform = 'scale(1.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'rgba(108, 117, 125, 0.9)';
                e.target.style.transform = 'scale(1)';
              }}
            >
              <i className="bi bi-pencil"></i>
            </button>
            
            <img 
              src={media.imagen || "https://via.placeholder.com/300x180"} 
              className="card-img-top" 
              alt={media.titulo || "Media"}
              style={{
                height: '200px', 
                objectFit: 'contain', 
                backgroundColor: '#f8f9fa',
                padding: '8px'
              }}
            />
            <div className="card-body card-body-custom d-flex flex-column">
                <div className="flex-grow-1">
                  <h5 className="card-title card-title-custom">{media.titulo}</h5>
                  <p className="card-text card-subtitle-custom"><small className="text-muted">Serial: {media.serial}</small></p>
                  <hr className="divider-custom" />
                  
                  <p className="card-text card-text-custom">{media.sinopsis}</p>
                  
                  {media.fechaEstreno && (
                    <p className="card-text card-text-custom"><strong><i className="bi bi-calendar-event me-1"></i>Estreno:</strong> {new Date(media.fechaEstreno).toLocaleDateString()}</p>
                  )}
                  
                  <div className="mt-3">
                    {media.genero && (
                      <span className="badge-primary-custom me-2">
                        <i className="bi bi-tags me-1"></i>{media.genero.nombre}
                      </span>
                    )}
                    {media.tipo && (
                      <span className="badge-secondary-custom me-2">
                        <i className="bi bi-tv me-1"></i>{media.tipo.nombre}
                      </span>
                    )}
                  </div>
                  
                  {media.director && (
                    <p className="card-text card-text-custom mt-2"><strong><i className="bi bi-person-video2 me-1"></i>Director:</strong> {media.director.nombres}</p>
                  )}
                  {media.productora && (
                    <p className="card-text card-text-custom"><strong><i className="bi bi-building me-1"></i>Productora:</strong> {media.productora.nombre}</p>
                  )}
                </div>
                
                {/* Botón siempre al final */}
                <div className="mt-auto">
                  {media.url && (
                    <div className="d-grid">
                      <a href={media.url} target="_blank" rel="noopener noreferrer" className="btn-primary-custom">
                        <i className="bi bi-play-circle me-2"></i>Ver ahora
                      </a>
                    </div>
                  )}
                </div>
            </div>
        </div>
    </div>
  )
}
