// TODO: create a component that displays a single wine bottle
import "./WineBottle.css";
import {useState} from 'react';

export default function WineBottle({name, price, country, type, image, onClick}) {
	return (
		<div className="WineBottle">
      <p><b>{name}</b></p>
      <p>{price}</p>
      <p><i>{country}</i></p>
      <p>{type}</p>
      <p><img src = {image} height = "200"></img></p>
      <button onClick={() => onClick(name)}>
        Add to Favorites
      </button>
		</div>
	);
}