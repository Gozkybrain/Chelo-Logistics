import React, { useEffect, useRef, useState } from 'react';
import { Map, View } from 'ol';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import { fromLonLat } from 'ol/proj';
import { Feature } from 'ol';
import { Point, LineString } from 'ol/geom';
import { Vector as VectorLayer } from 'ol/layer';
import { Vector as VectorSource } from 'ol/source';
import { Style, Icon, Stroke, Circle as CircleStyle, Fill, Text } from 'ol/style';

const TrackMap = ({ shipment }) => {
    const mapRef = useRef(null);
    const [isLoading, setIsLoading] = useState(true);

    // Initialize OpenLayers Map
    useEffect(() => {
        if (!shipment || !mapRef.current) return;

        // Create a new map instance
        const map = new Map({
            target: mapRef.current,
            layers: [
                new TileLayer({
                    // OpenStreetMap as the base layer
                    source: new OSM(),
                }),
            ],
            view: new View({
                // Center of the US
                center: fromLonLat([-95.7129, 37.0902]),
                // Initial zoom level
                zoom: 3,
            }),
            // Remove all default controls (buttons)
            controls: [],
        });

        // Geocode locations and add markers
        const geocodeLocation = async (locationName) => {
            try {
                const response = await fetch(
                    `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(locationName)}`
                );
                const data = await response.json();
                if (data.length > 0) {
                    const [lon, lat] = [parseFloat(data[0].lon), parseFloat(data[0].lat)];
                    return [lon, lat];
                }
            } catch (err) {
                console.error('Geocoding error:', err);
            }
            return null;
        };

        
        // Add markers and lines for the route
        const addRoute = async () => {
            // Set loading to true while fetching locations
            setIsLoading(true);

            const routePoints = [
                { name: 'Origin', location: shipment.route.origin },
                { name: 'Location 1', location: shipment.route.location1 },
                { name: 'Location 2', location: shipment.route.location2 },
                { name: 'Location 3', location: shipment.route.location3 },
                { name: 'Location 4', location: shipment.route.location4 },
                { name: 'Location 5', location: shipment.route.location5 },
                { name: 'Destination', location: shipment.route.destination },
            ];

            const vectorSource = new VectorSource();
            const lineSource = new VectorSource();
            const thickLineSource = new VectorSource();

            const coordinates = [];
            let currentLocationIndex = -1;

            for (let i = 0; i < routePoints.length; i++) {
                const point = routePoints[i];
                const coords = await geocodeLocation(point.location);
                if (coords) {
                    // Add marker for origin and destination
                    if (point.name === 'Origin' || point.name === 'Destination') {
                        const marker = new Feature({
                            geometry: new Point(fromLonLat(coords)),
                            name: point.name,
                        });

                        // Use the original icon for origin and destination
                        const iconUrl = 'https://openlayers.org/en/latest/examples/data/icon.png';

                        marker.setStyle(
                            new Style({
                                image: new Icon({
                                    src: iconUrl,
                                    scale: 0.5,
                                }),
                                text: new Text({
                                    // Display the location name
                                    text: point.location,
                                    // Position the label above the marker
                                    offsetY: -20,
                                    font: '14px Arial',
                                    // Text color
                                    fill: new Fill({ color: '#000' }),
                                    // Text outline
                                    stroke: new Stroke({ color: '#fff', width: 2 }),
                                    // White background
                                    backgroundFill: new Fill({ color: '#fff' }),
                                    // Padding for the background
                                    padding: [5, 5, 5, 5],
                                    // Add a class name for custom styling
                                    className: 'location-label',
                                }),
                            })
                        );

                        vectorSource.addFeature(marker);
                    }

                    // Add blinking effect for current location
                    if (point.location === shipment.currentLocation) {
                        // Track the index of the current location
                        currentLocationIndex = i;
                        const blinkStyle = new Style({
                            image: new CircleStyle({
                                radius: 10,
                                fill: new Fill({
                                    // Red blinking circle
                                    color: 'rgba(255, 0, 0, 0.5)',
                                }),
                            }),
                        });

                        // Apply blinking effect using setInterval
                        const marker = new Feature({
                            geometry: new Point(fromLonLat(coords)),
                            name: point.name,
                        });

                        let isBlinking = true;
                        setInterval(() => {
                            marker.setStyle(isBlinking ? blinkStyle : null);
                            isBlinking = !isBlinking;
                            // Blink every 500ms
                        }, 500);

                        vectorSource.addFeature(marker);

                        // Add a static label for the current location
                        const label = new Feature({
                            geometry: new Point(fromLonLat(coords)),
                        });

                        label.setStyle(
                            new Style({
                                text: new Text({
                                    text: `${point.location}\nStatus: ${shipment.status}`,
                                    offsetY: -40,
                                    font: '14px Arial',
                                    fill: new Fill({ color: '#000' }),
                                    stroke: new Stroke({ color: '#fff', width: 2 }),
                                    // White background
                                    backgroundFill: new Fill({ color: '#fff' }),
                                    // Padding for the background
                                    padding: [5, 5, 5, 5],
                                    // Add a class name for custom styling
                                    className: 'location-label',
                                }),
                            })
                        );

                        vectorSource.addFeature(label);
                    }

                    coordinates.push(fromLonLat(coords));
                }
            }

            // Add a dotted line connecting all locations
            if (coordinates.length > 1) {
                const line = new Feature({
                    geometry: new LineString(coordinates),
                });

                line.setStyle(
                    new Style({
                        stroke: new Stroke({
                            // Blue color
                            color: '#007bff',
                            width: 2,
                            // Dotted line pattern
                            lineDash: [10, 5],
                        }),
                    })
                );

                lineSource.addFeature(line);
            }

            // Add a thick line from origin to current location
            if (currentLocationIndex !== -1 && coordinates.length > 1) {
                const thickLine = new Feature({
                    geometry: new LineString(coordinates.slice(0, currentLocationIndex + 1)),
                });

                thickLine.setStyle(
                    new Style({
                        stroke: new Stroke({
                            // Blue color
                            color: '#007bff',
                            // Thicker line
                            width: 4,
                        }),
                    })
                );

                thickLineSource.addFeature(thickLine);
            }

            // Add markers and lines to the map
            map.addLayer(
                new VectorLayer({
                    source: vectorSource,
                })
            );

            map.addLayer(
                new VectorLayer({
                    source: lineSource,
                })
            );

            map.addLayer(
                new VectorLayer({
                    source: thickLineSource,
                })
            );

            // Fit the map view to show all locations
            if (coordinates.length > 0) {
                const extent = new LineString(coordinates).getExtent();
                map.getView().fit(extent, {
                    // Add padding around the route
                    padding: [50, 50, 50, 50],
                    // Limit the maximum zoom level
                    maxZoom: 5,
                });
            }
            // Set loading to false after fetching locations
            setIsLoading(false);
        };

        addRoute();
    }, [shipment]);

    return (
        <div ref={mapRef} className="map-container" style={{ height: '400px', width: '100%', position: 'relative' }}>
            {/* Loading message */}
            {isLoading && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: '#222222',
                        padding: '10px 20px',
                        borderRadius: '5px',
                        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
                        zIndex: 1000,
                    }}
                >
                    Fetching locations for map ...
                </div>
            )}
        </div>
    );
};

export default TrackMap;