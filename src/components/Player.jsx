import React, { useState, useEffect } from 'react';         // React et ses hooks
import { NavLink } from 'react-router-dom';

const Player = ({joueur, onDelete}) => {

const handleDelete = () => {
    onDelete(joueur.id);
    }
  

  

  return (
    <div className="container" style={{
      position: 'relative',  // Ajout de cette ligne
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '15px',
      margin: '10px',
      width: '300px'
    }}>
 
 <img
        src={`/images/${joueur.img || 'placeholder.jpg'}`}
        alt={joueur.name}
        style={{ width: '100%', borderRadius: '8px' }}
      />  
    
    <NavLink to={`/details/${joueur.id}`}>
        <h3>{joueur.name}</h3>
   </NavLink>
      <p>Poste: {joueur.poste}</p>
      <p>Poids: {joueur.poids}</p>
      <p>nombre de cartes jaunes: {joueur.nbreCartonsJaunes}</p>
    
  <button onClick={handleDelete}>delete</button>
      </div>
  
  );
};

export default Player;