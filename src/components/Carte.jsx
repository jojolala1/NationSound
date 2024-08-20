import React, { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import L from 'leaflet'; 
import 'leaflet/dist/leaflet.css';
import festivalLocations from "../festivalLocations.json"

export default function Carte() {

    const bootstrapIcon = (iconClass) => `
        <div class="text-center">
            <i class="bi ${iconClass}" style="font-size: 24px; color: black;"></i>
        </div>
    `;

    const festivalLocationsLocation = festivalLocations.locations
    const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${festivalLocations.lieu.position[0]},${festivalLocations.lieu.position[1]}`;


    const [checked, setChecked] = useState({
        tous: false,
        snack: true,
        toilettes: true,
        scenes: true,
        soins: true,
        camping: true,
        parking: true,
        buvette: true,
    });

    const filterFunc = () => {
        
        return festivalLocations.locations.filter(location => {
            if (checked.snack && location.category === 'snack') return true;
            if (checked.toilettes && location.category === 'toilettes') return true;
            if (checked.scenes && location.category === 'scene') return true;
            if (checked.soins && location.category === 'soins') return true;
            if (checked.camping && location.category === 'camping') return true;
            if (checked.parking && location.category === 'parking') return true;
            if (checked.buvette && location.category === 'buvette') return true;

            return false;
        });
    };

    const checkedAll = () => {
        const isAllSelected = !checked.tous;
    
        setChecked({
            tous: isAllSelected,
            snack: isAllSelected,
            toilettes: isAllSelected,
            scenes: isAllSelected,
            soins: isAllSelected,
            camping: isAllSelected,
            parking: isAllSelected,
            buvette: isAllSelected,
        });
    };
    

    const handleCheckChange = (category) => {
        setChecked(prevChecked => {
            const newChecked = { ...prevChecked, [category]: !prevChecked[category] };
            return newChecked;
        });
    };

    const visibleLocations = filterFunc();

    return (
        <div className="marginUnderNav d-flex flex-column align-items-center">
            <h1 className="titleFont rouge mb-5 pVideorouge text-center titleFont fw-bolder display-2 pVideo px-4 mb-5 z-2">Carte interactive</h1>

            <div className="radius bgBlanc d-flex flex-column align-items-center mb-5 ">
                <div className="d-flex flex-column text-center">
                    <p className="vert titleFont h1 my-4">Filtres</p>
                    <form className="d-flex flex-column flex-md-row gap-2 gap-md-3 gap-lg-4">  
                        <div>
                            <input type="checkbox" id="Tous"  onChange={() => checkedAll()} />
                            <label htmlFor="Tous">Tous</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Snack" checked={checked.snack} onChange={() => handleCheckChange('snack')} />
                            <label htmlFor="Snack">Snack</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Toilettes" checked={checked.toilettes} onChange={() => handleCheckChange('toilettes')} />
                            <label htmlFor="Toilettes">Toilettes</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Scenes" checked={checked.scenes} onChange={() => handleCheckChange('scenes')} />
                            <label htmlFor="Scenes">Scènes</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Soins" checked={checked.soins} onChange={() => handleCheckChange('soins')} />
                            <label htmlFor="Soins">Soins</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Camping" checked={checked.camping} onChange={() => handleCheckChange('camping')} />
                            <label htmlFor="Camping">Camping</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Parking" checked={checked.parking} onChange={() => handleCheckChange('parking')} />
                            <label htmlFor="Parking">Parking</label>
                        </div>
                        <div>
                            <input type="checkbox" id="Buvette" checked={checked.buvette} onChange={() => handleCheckChange('buvette')} />
                            <label htmlFor="Buvette">Buvette</label>
                        </div>
                    </form>
                </div>
            <div className="formborder radius  m-4 m-md-5 shadoww">
                
                <MapContainer className="styleMap " center={festivalLocations.lieu.position} zoom={17} scrollWheelZoom={false}>
                    <TileLayer
                        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    {visibleLocations.map(location => (
                        <Marker 
                            key={location.id} 
                            position={location.position} 
                            icon={L.divIcon({
                                className: 'custom-icon',
                                html: bootstrapIcon(location.iconClass),
                                iconSize: [30, 30],
                                iconAnchor: [15, 30], 
                                popupAnchor: [0, -30]
                            })}
                        >
                            <Popup>{location.name}</Popup>
                        </Marker>
                    ))}
                </MapContainer>
            </div>
            <a href={googleMapsUrl} className="my-4">addresse du lieu</a>
            </div>
            
        </div>
    );
}
