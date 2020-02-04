import React from 'react';
import PropTypes from 'prop-types';

import { Form, Col } from 'react-bootstrap';
import StarRatingComponent from 'react-star-rating-component';
import authData from '../../../helpers/data/authData';
import mapData from '../../../helpers/data/mapData';

import './RouteForm.scss';

class RouteForm extends React.Component {
  static propTypes = {
    coords: PropTypes.array,
    closeSidebar: PropTypes.func,
  }

  state = {
    routeId: '',
    routeName: '',
    rating: 1,
    isPublic: false,
  }

  // componentDidMount() {
  //   const { route } = this.props;
  //   const coords = route.coordinates.map((m) => ({ value: `${m.id}`, label: `${m.name}` }));
  //   const routeId = route.id;
  //   if (routeId) {
  //     this.setState({ routId: routeId })
  //   }
  // };

  nameChange = (e) => {
    e.preventDefault();
    this.setState({ routeName: e.target.value });
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  handleChange = () => {
    this.setState({ isPublic: !this.state.isPublic });
  }

  addRouteEvent = () => {
    const { routeName, rating, isPublic } = this.state;
    const { coords, closeSidebar } = this.props
    const newRoute = {
      routeName,
      routeRating: rating,
      isPublic,
      coordinates: coords,
      uid: authData.getUid(),
    };
    mapData.addRoute(newRoute)
      .then()
      .catch((errFromAddRoute) => console.error(errFromAddRoute));
    // closeSidebar();
  }

  render() {
    const { rating, isPublic, routeName } = this.state;
    return (
      <div>
        <h1>Route Form</h1>
        <Form>
          <Form.Group>
            <Form.Control
            placeholder="Route Name"
            value={routeName}
            onChange={this.nameChange} />
          </Form.Group>

          <Form.Row>
            <Form.Group as={Col}>
              <StarRatingComponent
                name="rate1"
                starCount={5}
                value={rating}
                starColor={"#bb0004"}
                emptyStarColor={"#ffffff"}
                size={"large"}
                editing={true}
                onStarClick={this.onStarClick.bind(this)}
              />
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Check
                type="switch"
                id="custom-switch"
                label="Public"
                checked={isPublic}
                onChange={this.handleChange}
              />
              </Form.Group>
          </Form.Row>

          {/* <Form.Row>

            <Form.Group as={Col}>
              <Form.Control placeholder="Longitude" />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Control placeholder="Lattitude" />
            </Form.Group>

          </Form.Row> */}

        </Form>
        <button className="add-route btn btn-danger btn-block" onClick={this.addRouteEvent}>ADD ROUTE</button>
      </div>
    );
  }
}

export default RouteForm;