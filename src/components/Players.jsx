import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { fetchJoueur, deleteJoueur } from './api';
import Player from './Player'; // Importer le composant Joueur
const Players = () => {
  
    const [Joueur, setJoueur] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [nbreCartonsJaunes, setNbrcarte] = useState('');

  useEffect(() => {
    loadJoueurs();
  }, []);

const loadJoueurs= async () => {
    try {
      setLoading(true);
      const data = await fetchJoueur();
      setJoueur(data);


    
    } catch (err) {
      setError('Erreur lors du chargement des movies');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Êtes-vous sûr de vouloir supprimer ce joueur ?")) {
      try {
        await deleteJoueur(id);
        setJoueur(Joueur.filter((joueur) => joueur.id !== id));
      } catch (err) {
        setError('Erreur lors de la suppression du joueur');
        console.error(err);
      }
    }
  }

  const handlecartChange = (e) =>{
    setNbrcarte(e.target.value);
  };

  // Change only the filtrecarte function

const filtrecarte = Joueur.filter(joueur => {
    if (nbreCartonsJaunes === '') {
      return true;
    } else {
      // Convert both to strings or both to integers for comparison
      return String(joueur.nbreCartonsJaunes) === String(nbreCartonsJaunes);
    }
  });

  if (loading) return <div className="text-center p-5">Chargement...</div>;
  if (error) return <div className="alert alert-danger m-5">{error}</div>;


  return(

    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '20px' }}>

<div>
              <label htmlFor="nbreCartonsJaunes">Nbr Cartes: </label>
              <input
                type="number"
                id="nbreCartonsJaunes"  
                value={nbreCartonsJaunes}
                onChange={handlecartChange}
                placeholder="nbr carte"
                style={{ padding: '8px' }}
              />
            </div>


     {/* Affichage des movies */}
     {filtrecarte.map((joueur) => (
        <Player //fils
          key={joueur.id}
          joueur={joueur}
          onDelete={handleDelete} // Passer la fonction de suppression en tant que prop
          
        
        />
      ))}
       </div>



);
  

};
export default Players;