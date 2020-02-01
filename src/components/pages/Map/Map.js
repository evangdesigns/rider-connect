import React from 'react';
import firebase from 'firebase/app';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import mapData from '../../../helpers/data/mapData';

import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './Map.scss';

mapboxgl.accessToken = 'pk.eyJ1IjoiZXZhbmdkZXNpZ25zIiwiYSI6ImNrNXBnaTg3bjF2a3Izamx2a2x5bWx1MjUifQ.UyhZi1JrgS7xPoUFvv9vuA';

class Map extends React.Component {
  state = {
    authed: false,
    lng: -86.726002,
    lat: 36.127709,
    zoom: 14.5,
    coord: {},
  };

  componentDidMount() {
    this.removeListener = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ authed: true });
        map.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true
          })
        );
        // Add the draw tool to the map
        map.addControl(draw);
      } else {
        this.setState({ authed: false });
        map.removeControl(draw);
      };
    });

    const map = new mapboxgl.Map({
      container: this.mapContainer,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.lng, this.state.lat],
      zoom: this.state.zoom
    });

    const draw = new MapboxDraw({
      displayControlsDefault: false,
      controls: {
        line_string: true,
        trash: true
      },
      styles: [
        {
          "id": "gl-draw-line",
          "type": "line",
          "filter": ["all", ["==", "$type", "LineString"],
            ["!=", "mode", "static"]
          ],
          "layout": {
            "line-cap": "round",
            "line-join": "round"
          },
          "paint": {
            "line-color": "#BB0004",
            "line-dasharray": [0.2, 2],
            "line-width": 4,
            "line-opacity": 0.7
          }
        },
        {
          "id": "gl-draw-polygon-and-line-vertex-active",
          "type": "circle",
          "filter": ["all", ["==", "meta", "vertex"],
            ["==", "$type", "Point"],
            ["!=", "mode", "static"]
          ],
          "paint": {
            "circle-radius": 8,
            "circle-color": "#bb0004",
          }
        },
      ]
    });

    map.on('move', () => {
      this.setState({
        lng: map.getCenter().lng.toFixed(4),
        lat: map.getCenter().lat.toFixed(4),
        zoom: map.getZoom().toFixed(2)
      });
    });

    // Use the coordinates you drew to make the Map Matching API request
    const updateRoute = () => {
      // Set the profile
      var profile = "driving";
      // Get the coordinates that were drawn on the map
      var data = draw.getAll();
      var lastFeature = data.features.length - 1;
      var coords = data.features[lastFeature].geometry.coordinates;
      // Format the coordinates
      var newCoords = coords.join(';')
      // Set the radius for each coordinate pair to 25 meters
      var radius = [];
      coords.forEach(element => {
        radius.push(25);
      });
      getMatch(newCoords, radius, profile);
    }

    // Make a Map Matching request
    const getMatch = (coordinates, radius, profile) => {
      // Separate the radiuses with semicolons
      var radiuses = radius.join(';')
      // Create the query
      var query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;

      mapData.matchRouteRequest(query)
        .then((data) => {
          const coords = data.matchings[0].geometry;
          console.log(coords);
          // Draw the route on the map
          addRoute(coords);
        })
        .catch((err) => console.error('error from retrieveing map matching data', err));
    };

    // Draw the Map Matching route as a new layer on the map
    const addRoute = (coords) => {
      // If a route is already loaded, remove it
      if (map.getSource('route')) {
        map.removeLayer('route')
        map.removeSource('route')
      } else {
        map.addLayer({
          "id": "route",
          "type": "line",
          "source": {
            "type": "geojson",
            "data": {
              "type": "Feature",
              "properties": {},
              "geometry": coords
            }
          },
          "layout": {
            "line-join": "round",
            "line-cap": "round"
          },
          "paint": {
            "line-color": "#03AA46",
            "line-width": 8,
            "line-opacity": 0.8
          }
        });
      };
    }

    // If the user clicks the delete draw button, remove the layer if it exists
    const removeRoute = () => {
      if (map.getSource('route')) {
        map.removeLayer('route');
        map.removeSource('route');
      } else {
        return;
      }
    }

    map.on('draw.create', updateRoute);
    map.on('draw.update', updateRoute);
    map.on('draw.delete', removeRoute);

};//END ComponentDidMount()

componentWillUnmount() {
  this.removeListener();
}

  render() {
    return (
      <div className="Map">
        <div className='sidebarStyle'>
          <div>Longitude: {this.state.lng} | Latitude: {this.state.lat} | Zoom: {this.state.zoom}</div>
        </div>
        <div ref={el => this.mapContainer = el} className='mapContainer' />
      </div>
    );
  }
}

export default Map;