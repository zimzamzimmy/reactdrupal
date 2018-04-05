import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet'

const PROJECT_QUERY = gql`
  query ProjectQuery($id: String!){
    nodeById(id: $id) {
      title
      entityUrl{
        path
      }
      ...on NodePage {
        body {
          processed
        }
        fieldGeofield {
          lat
          lon
          latlon
        }
        fieldAddress {
          addressLine1
          addressLine2
          locality
          postalCode
        }
        fieldPhoneNumber
      }
    }
  }
`;

class AboutUs extends Component {
  state = {
    zoom: 13
  }
  render() {
    if (this.props.projectQuery && this.props.projectQuery.loading) {
        return <div>Loading</div>
    }
    if (this.props.projectQuery && this.props.projectQuery.error) {
        return <div>Error</div>
    }
    console.log(this.props.projectQuery.nodeById);
    const data = this.props.projectQuery
    const address = data.nodeById.fieldAddress
    const phone = data.nodeById.fieldPhoneNumber
    const position = [data.nodeById.fieldGeofield.lat, data.nodeById.fieldGeofield.lon]
    return(
      <div>
        <h1>{data.nodeById.title}</h1>
        <div dangerouslySetInnerHTML={{__html: data.nodeById.body.processed}} />
        <div className="vcard">
          <p className="fn">Dr. Jack Osborne</p>
          <p className="adr">
            <span className="street-address">{address.addressLine1}</span><br />
            <span className="region">{ address.locality }</span><br />
            <span className="postal-code">{address.postalCode}</span>
          </p>
          <a href={`tel:${ phone }`}>{ phone }</a>
        </div>
        
        <Map center={position} zoom={this.state.zoom}>
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          <Marker position={position}>
            <Popup>
              <span>
                A pretty CSS3 popup. <br /> Easily customizable.
              </span>
            </Popup>
          </Marker>
        </Map>
      </div>         
    )
  }
}

export default graphql(PROJECT_QUERY, { name: 'projectQuery',
  options: (props) => ({ variables: { id: "4"  } })
})( AboutUs );
