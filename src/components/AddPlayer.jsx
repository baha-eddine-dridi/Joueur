import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { createJoueur } from './api';

// Définir le schéma de validation avec Zod
const playerSchema = z.object({
  name: z.string().min(1, "Le nom est obligatoire"),
  poste: z.enum(["gardien", "defenseur", "milieu", "attaquant"], {
    errorMap: () => ({ message: "Veuillez sélectionner un poste" })
  }),
  poids: z.string()
    .min(1, "Le poids est obligatoire")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) >= 40, "Le poids minimum est de 40kg")
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) <= 120, "Le poids maximum est de 120kg"),
  nbreCartonsJaunes: z.string()
    .min(1, "Ce champ est obligatoire")
    .refine((val) => !isNaN(parseInt(val)) && parseInt(val) >= 0, "Le minimum est 0")
});

function AddPlayer() {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  
  // Initialiser React Hook Form avec le resolver Zod
  const { 
    register, 
    handleSubmit, 
    formState: { errors } 
  } = useForm({
    resolver: zodResolver(playerSchema)
  });

  // Gérer le changement d'image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Soumettre le formulaire
  const onSubmit = async (data) => {
    try {
      setIsSubmitting(true);
      
      // Créer le nouvel objet joueur
      const newJoueur = {
        name: data.name,
        poste: data.poste,
        poids: data.poids,
        nbreCartonsJaunes: data.nbreCartonsJaunes,
        img: selectedImage ? selectedImage.name : 'placeholder.jpg'
      };
      
      // Envoyer à l'API
      await createJoueur(newJoueur);
      
      // Rediriger vers la liste des joueurs
      navigate('/');
    } catch (error) {
      console.error("Erreur lors de l'ajout du joueur:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mt-4">
      <h3 className="mb-4 text-center">Ajouter un nouveau joueur</h3>
      
      <form onSubmit={handleSubmit(onSubmit)} className="mx-auto" style={{maxWidth: "500px"}}>
        {/* Nom du joueur */}
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Nom du joueur</label>
          <input
            type="text"
            className={`form-control ${errors.name ? 'is-invalid' : ''}`}
            id="name"
            {...register('name')}
          />
          {errors.name && <div className="invalid-feedback">{errors.name.message}</div>}
        </div>
        
        {/* Poste du joueur (radios) */}
        <div className="mb-3">
          <label className="form-label d-block">Poste</label>
          
          {/* Options de postes */}
          {['gardien', 'defenseur', 'milieu', 'attaquant'].map(poste => (
            <div className="form-check form-check-inline" key={poste}>
              <input
                className="form-check-input"
                type="radio"
                id={poste}
                value={poste}
                {...register('poste')}
              />
              <label className="form-check-label" htmlFor={poste}>
                {poste.charAt(0).toUpperCase() + poste.slice(1)}
              </label>
            </div>
          ))}
          
          {errors.poste && <div className="text-danger small">{errors.poste.message}</div>}
        </div>
        
        {/* Poids */}
        <div className="mb-3">
          <label htmlFor="poids" className="form-label">Poids (kg)</label>
          <input
            type="number"
            className={`form-control ${errors.poids ? 'is-invalid' : ''}`}
            id="poids"
            {...register('poids')}
          />
          {errors.poids && <div className="invalid-feedback">{errors.poids.message}</div>}
        </div>
        
        {/* Cartons jaunes */}
        <div className="mb-3">
          <label htmlFor="nbreCartonsJaunes" className="form-label">Nombre de cartons jaunes</label>
          <input
            type="number"
            className={`form-control ${errors.nbreCartonsJaunes ? 'is-invalid' : ''}`}
            id="nbreCartonsJaunes"
            {...register('nbreCartonsJaunes')}
          />
          {errors.nbreCartonsJaunes && <div className="invalid-feedback">{errors.nbreCartonsJaunes.message}</div>}
        </div>
        
        {/* Image */}
        <div className="mb-3">
          <label htmlFor="image" className="form-label">Photo du joueur</label>
          <input
            type="file"
            className="form-control"
            id="image"
            accept="image/*"
            onChange={handleImageChange}
          />
          {previewImage && (
            <img 
              src={previewImage} 
              alt="Aperçu" 
              className="mt-2 img-thumbnail" 
              style={{height: "150px"}} 
            />
          )}
        </div>
        
        {/* Boutons d'action */}
        <div className="d-flex gap-2 mt-4">
          <button 
            type="button" 
            className="btn btn-secondary flex-grow-1" 
            onClick={() => navigate('/Players')}
          >
            Annuler
          </button>
          <button 
            type="submit" 
            className="btn btn-primary flex-grow-1" 
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddPlayer;