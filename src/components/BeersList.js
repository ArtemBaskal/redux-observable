import React from "react";

export function BeersList(props) {
  return (
    <ul>
      {props.beers.map(beer => (
        <li key={beer.id}>
          <figure>
            <img src={beer.image_url} />
          </figure>
          <div>
            <p>{beer.name}</p>
            <ul>
              <li>
                <small>ABV: {beer.abs}</small>
              </li>
              <li>
                <small>
                  Volume: {beer.volume.unit} {beer.volume.unit}
                </small>
              </li>
            </ul>
          </div>
        </li>
      ))}
    </ul>
  );
}
