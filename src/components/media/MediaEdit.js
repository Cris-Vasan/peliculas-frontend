import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../service/directorService';
import { getGeneros } from '../../service/generoService';
import { getProductoras } from '../../service/productoraService';
import { getTipos } from '../../service/tipoService';

export const MediaEdit = ({ show, onHide, onSave, media }) => {
  const [formData, setFormData] = useState({
    serial: '',
    titulo: '',
    sinopsis: '',
    url: '',
    imagen: '',
    fechaEstreno: '',
    genero_id: '',
    director_id: '',
    productora_id: '',
    tipo_id: ''
  });

  // Estados para los catálogos
  const [directores, setDirectores] = useState([]);
  const [generos, setGeneros] = useState([]);
  const [productoras, setProductoras] = useState([]);
  const [tipos, setTipos] = useState([]);

  // Cargar datos cuando se muestre el modal y haya media seleccionada
  useEffect(() => {
    if (show && media) {
      cargarCatalogos();
      cargarDatosMedia();
    }
  }, [show, media]);

  const cargarCatalogos = async () => {
    try {
      const [directoresRes, generosRes, productorasRes, tiposRes] = await Promise.all([
        getDirectores(),
        getGeneros(), 
        getProductoras(),
        getTipos()
      ]);
      
      setDirectores(directoresRes.data || []);
      setGeneros(generosRes.data || []);
      setProductoras(productorasRes.data || []);
      setTipos(tiposRes.data || []);
    } catch (error) {
      console.error("Error al cargar catálogos:", error);
    }
  };

  const cargarDatosMedia = () => {
    if (media) {
      setFormData({
        serial: media.serial || '',
        titulo: media.titulo || '',
        sinopsis: media.sinopsis || '',
        url: media.url || '',
        imagen: media.imagen || '',
        fechaEstreno: media.fechaEstreno ? media.fechaEstreno.split('T')[0] : '',
        genero_id: media.genero?._id || '',
        director_id: media.director?._id || '',
        productora_id: media.productora?._id || '',
        tipo_id: media.tipo?._id || ''
      });
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!show || !media) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-pencil me-2"></i>
              Editar Película: {media.titulo}
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body modal-body-custom">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="serial" className="form-label">Serial *</label>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      id="serial"
                      name="serial"
                      value={formData.serial}
                      readOnly
                      style={{backgroundColor: '#f8f9fa', cursor: 'not-allowed'}}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="titulo" className="form-label">Título *</label>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      id="titulo"
                      name="titulo"
                      value={formData.titulo}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="sinopsis" className="form-label">Sinopsis *</label>
                <textarea
                  className="form-control form-control-custom"
                  id="sinopsis"
                  name="sinopsis"
                  rows="3"
                  value={formData.sinopsis}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="url" className="form-label">URL de la Película</label>
                    <input
                      type="url"
                      className="form-control form-control-custom"
                      id="url"
                      name="url"
                      value={formData.url}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="imagen" className="form-label">URL de la Imagen</label>
                    <input
                      type="url"
                      className="form-control form-control-custom"
                      id="imagen"
                      name="imagen"
                      value={formData.imagen}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="fechaEstreno" className="form-label">Fecha de Estreno</label>
                    <input
                      type="date"
                      className="form-control form-control-custom"
                      id="fechaEstreno"
                      name="fechaEstreno"
                      value={formData.fechaEstreno}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="genero_id" className="form-label">Género</label>
                    <select
                      className="form-control form-control-custom"
                      id="genero_id"
                      name="genero_id"
                      value={formData.genero_id}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar género...</option>
                      {generos.map((genero) => (
                        <option key={genero._id} value={genero._id}>
                          {genero.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="director_id" className="form-label">Director</label>
                    <select
                      className="form-control form-control-custom"
                      id="director_id"
                      name="director_id"
                      value={formData.director_id}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar director...</option>
                      {directores.map((director) => (
                        <option key={director._id} value={director._id}>
                          {director.nombres}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="productora_id" className="form-label">Productora</label>
                    <select
                      className="form-control form-control-custom"
                      id="productora_id"
                      name="productora_id"
                      value={formData.productora_id}
                      onChange={handleChange}
                    >
                      <option value="">Seleccionar productora...</option>
                      {productoras.map((productora) => (
                        <option key={productora._id} value={productora._id}>
                          {productora.nombre}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="mb-3">
                <label htmlFor="tipo_id" className="form-label">Tipo</label>
                <select
                  className="form-control form-control-custom"
                  id="tipo_id"
                  name="tipo_id"
                  value={formData.tipo_id}
                  onChange={handleChange}
                >
                  <option value="">Seleccionar tipo...</option>
                  {tipos.map((tipo) => (
                    <option key={tipo._id} value={tipo._id}>
                      {tipo.nombre}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Actualizar Película
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
