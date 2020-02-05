import React from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase/app';

import mapboxgl from 'mapbox-gl';
import MapboxDraw from '@mapbox/mapbox-gl-draw';

import mapData from '../../../helpers/data/mapData';
import mapBoxApi from '../../../helpers/mapBoxApi';
import '@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css';
import './Map.scss';

mapboxgl.accessToken = mapBoxApi.token;

class Map extends React.Component {
  static propTypes = {
    setCoords: PropTypes.func,
  }
  state = {
    authed: false,
    lng: -83.9345,
    lat: 35.4765,
    zoom: 14.5,
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
        // map.addControl(new mapboxgl.NavigationControl());
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

    map.on('load', () => {
      mapData.getAllRoutes()
        .then((routes) => {
          routes.map((route) => {
            map.addLayer({
              id: route.id,
              type: 'line',
              source: {
                type: 'geojson',
                data: {
                  type: 'Feature',
                  properties: {
                    title: 'Mapbox DC',
                    description: '1714 14th St NW, Washington DC',
                    image: 'https://farm9.staticflickr.com/8604/15769066303_3e4dcce464_n.jpg',
                    icon: {
                      iconUrl: 'https://www.mapbox.com/mapbox.js/assets/images/astronaut1.png',
                      iconSize: [50, 50], // size of the icon
                      iconAnchor: [0, 0], // point of the icon which will correspond to marker's location
                      popupAnchor: [0, 0], // point from which the popup should open relative to the iconAnchor
                    }
                  },
                  geometry: {
                    type: 'LineString',
                    coordinates: route.coordinates
                  },
                },
              },
              'layout': {
                'line-join': 'round',
                'line-cap': 'round'
                },
              'paint': {
                'line-color': '#BB0004',
                'line-width': 8,
              }
            });
          })
        })
        .catch((err) => console.error('error getting all motorcycles', err));
    })

    // Use the coordinates you drew to make the Map Matching API request
    const updateRoute = () => {
      const profile = "driving";
      const data = draw.getAll();
      const lastFeature = data.features.length - 1;
      const coords = data.features[lastFeature].geometry.coordinates;
      const newCoords = coords.join(';')
      const radius = [];
      coords.forEach(element => {
        radius.push(25);
      });
      getMatch(newCoords, radius, profile);
    }

    // Make a Map Matching request
    const getMatch = (coordinates, radius, profile) => {
      const radiuses = radius.join(';')
      const query = 'https://api.mapbox.com/matching/v5/mapbox/' + profile + '/' + coordinates + '?geometries=geojson&radiuses=' + radiuses + '&steps=true&access_token=' + mapboxgl.accessToken;

      mapData.matchRouteRequest(query)
        .then((data) => {
          const coords = data.matchings[0].geometry;
          this.props.setCoords(coords.coordinates);
          // Draw the route on the map
          addRoute(coords);
        })
        .catch((err) => console.error('error from retrieveing map matching data', err));
    };

    // Draw the Map Matching route as a new layer on the map
    const addRoute = (coords) => {
      if (map.getSource('newRoute')) {
        map.removeLayer('newRoute')
        map.removeSource('newRoute')
      } else {
        map.addLayer({
          "id": 'newRoute',
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