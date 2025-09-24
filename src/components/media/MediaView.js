import React, {useState, useEffect} from 'react'
import { getMedia, createMedia, updateMedia } from '../../service/mediaService'
import { MediaCard } from './MediaCard'
import { MediaNew } from './MediaNew'
import { MediaEdit } from './MediaEdit'

export const MediaView = () => {

  const [media, setMedia] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedMedia, setSelectedMedia] = useState(null)

  const listarMedia = async () => {
    try {
      const {data} = await getMedia()
      setMedia(data);
    } catch (error) {
      console.error("Error al listar medios:", error);
    }
  }

  const handleSaveMedia = async (formData) => {
    try {
      await createMedia(formData);
      setShowModal(false);
      // Refrescar la lista
      listarMedia();
      alert('Película agregada exitosamente!');
    } catch (error) {
      console.error("Error al crear media:", error);
      alert('Error al agregar la película');
    }
  }

  const handleEditMedia = (mediaItem) => {
    setSelectedMedia(mediaItem);
    setShowEditModal(true);
  }

  const handleUpdateMedia = async (formData) => {
    try {
      await updateMedia(selectedMedia._id, formData);
      setShowEditModal(false);
      setSelectedMedia(null);
      // Refrescar la lista
      listarMedia();
      alert('Película actualizada exitosamente!');
    } catch (error) {
      console.error("Error al actualizar media:", error);
      alert('Error al actualizar la película');
    }
  }

  useEffect(() => {
    listarMedia();
  }, []);

  return (
    <>
      <div className="container">
        <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3">
          {media.map((mediaItem, index) => (
            <MediaCard 
              key={mediaItem._id || index} 
              media={mediaItem} 
              onEdit={handleEditMedia}
            />
          ))}
        </div>
      </div>

      {/* Botón flotante para agregar */}
      <button 
        className="floating-btn"
        onClick={() => setShowModal(true)}
        title="Agregar nueva película"
      >
        <i className="bi bi-plus"></i>
      </button>

      {/* Modal para agregar película */}
      <MediaNew
        show={showModal}
        onHide={() => setShowModal(false)}
        onSave={handleSaveMedia}
      />

      {/* Modal para editar película */}
      <MediaEdit
        show={showEditModal}
        onHide={() => {
          setShowEditModal(false);
          setSelectedMedia(null);
        }}
        onSave={handleUpdateMedia}
        media={selectedMedia}
      />
    </>
  )
};

