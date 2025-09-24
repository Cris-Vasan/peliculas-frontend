import React, { useState, useEffect } from 'react';
import { getDirectores } from '../../service/directorService';
import { getGeneros } from '../../service/generoService';
import { getProductoras } from '../../service/productoraService';
import { getTipos } from '../../service/tipoService';

export const MediaNew = ({ show, onHide, onSave }) => {
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

  // Cargar catálogos cuando se muestre el modal
  useEffect(() => {
    if (show) {
      cargarCatalogos();
    }
  }, [show]);

  // Generar serial cuando cambie el tipo
  useEffect(() => {
    if (formData.tipo_id && tipos.length > 0) {
      generarSerial();
    }
  }, [formData.tipo_id, tipos]);

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

  const obtenerPrefijo = (tipoNombre) => {
    const nombre = tipoNombre.toLowerCase();
    if (nombre.includes('serie')) return 'SER';
    if (nombre.includes('pelicula') || nombre.includes('película')) return 'MOV';
    if (nombre.includes('corto')) return 'SHORT';
    // Para cualquier otro tipo, usar las primeras 3 letras
    return tipoNombre.substring(0, 3).toUpperCase();
  };

  const generarSerial = async () => {
    try {
      // Buscar el tipo seleccionado
      const tipoSeleccionado = tipos.find(tipo => tipo._id === formData.tipo_id);
      if (!tipoSeleccionado) return;

      const prefijo = obtenerPrefijo(tipoSeleccionado.nombre);
      
      // Necesitamos obtener todas las medias para calcular el próximo número
      const { getMedia } = await import('../../service/mediaService');
      const mediasRes = await getMedia();
      const medias = mediasRes.data || [];
      
      // Filtrar seriales que empiecen con este prefijo
      const serialesConPrefijo = medias
        .map(media => media.serial)
        .filter(serial => serial && serial.startsWith(prefijo))
        .map(serial => {
          const numero = parseInt(serial.replace(prefijo, ''));
          return isNaN(numero) ? 0 : numero;
        });
      
      // Obtener el próximo número
      const proximoNumero = serialesConPrefijo.length > 0 
        ? Math.max(...serialesConPrefijo) + 1 
        : 1;
      
      // Generar el serial con formato: PREFIJO + número con 3 dígitos
      const nuevoSerial = `${prefijo}${proximoNumero.toString().padStart(3, '0')}`;
      
      setFormData(prev => ({
        ...prev,
        serial: nuevoSerial
      }));
      
    } catch (error) {
      console.error("Error al generar serial:", error);
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
    // Limpiar formulario
    setFormData({
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
  };

  if (!show) return null;

  return (
    <div className="modal fade show d-block" tabIndex="-1" style={{backgroundColor: 'rgba(0,0,0,0.5)'}}>
      <div className="modal-dialog modal-lg">
        <div className="modal-content">
          <div className="modal-header modal-header-custom">
            <h5 className="modal-title modal-title-custom">
              <i className="bi bi-plus-circle me-2"></i>
              Agregar Nueva Película
            </h5>
            <button type="button" className="btn-close" onClick={onHide}></button>
          </div>
          
          <form onSubmit={handleSubmit}>
            <div className="modal-body modal-body-custom">
              <div className="row">
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="tipo_id" className="form-label">Tipo *</label>
                    <select
                      className="form-control form-control-custom"
                      id="tipo_id"
                      name="tipo_id"
                      value={formData.tipo_id}
                      onChange={handleChange}
                      required
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
                
                <div className="col-md-6">
                  <div className="mb-3">
                    <label htmlFor="serial" className="form-label">
                      Serial * 
                      <small className="text-muted">(Generado automáticamente)</small>
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-custom"
                      id="serial"
                      name="serial"
                      value={formData.serial}
                      readOnly
                      style={{backgroundColor: '#f8f9fa', cursor: 'not-allowed'}}
                      placeholder="Seleccione un tipo primero..."
                    />
                  </div>
                </div>
              </div>

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


            </div>

            <div className="modal-footer modal-footer-custom">
              <button type="button" className="btn-secondary-custom me-2" onClick={onHide}>
                Cancelar
              </button>
              <button type="submit" className="btn-primary-custom">
                <i className="bi bi-save me-2"></i>
                Guardar Película
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
