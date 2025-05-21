import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJoueur } from './api';

const PlayerDetails = () => {
  const { id } = useParams();
  const [joueur, setJoueur] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJoueurs = async () => {
      try {
        const data = await fetchJoueur(id);
        setJoueur(data);
        setLoading(false);
      } catch (err) {
        setError('Joueur does not exist');
        setLoading(false);
      }
    };
    fetchJoueurs();
  }, [id]);

  if (loading) return <div className="text-center p-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;
  if (!joueur) return <div className="alert alert-warning m-5">Film non trouvé</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-4">
          <img 
            src={`/images/${joueur.img || 'placeholder.jpg'}`} 
            alt={joueur.name} 
            className="img-fluid rounded"
          />
        </div>
        <div className="col-md-8">
          <h1>{joueur.name}</h1>
          <p> Poste : {joueur.poste}</p>
          <p> Poids: {joueur.poids}</p>
          <p >Nombre cartons jaune:{joueur.nbreCartonsJaunes}</p>
          <hr />
          
          <Link to="/" className="btn btn-primary">
            Retour à la liste
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PlayerDetails;