import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

const PROJECT_QUERY = gql`
  query ProjectQuery($id: String!){
    nodeById(id: $id) {
      title
      entityCreated
      entityUrl{
        path
      }
      ...on NodeProject {
        body {
          processed
        }
        fieldYear
        fieldImage {
          alt
          derivative(style:LARGE){
            url
          }
        }
        fieldImages {
          alt
          targetId
          derivative(style:LARGE){
            url
          }
        }
      }
    }
  }
`;

class ProjectMain extends Component {
  render() {
    if (this.props.projectQuery && this.props.projectQuery.loading) {
        return <div>Loading</div>
    }
    if (this.props.projectQuery && this.props.projectQuery.error) {
        return <div>Error</div>
    }
    console.log(this.props);
    const data = this.props.projectQuery.nodeById
    return(
        <div>
          <h1>{data.title}</h1>
          <h3>{data.fieldYear}</h3>
          <img src={data.fieldImage.derivative.url} alt={data.fieldImage.alt}/>
          <div dangerouslySetInnerHTML={{__html: data.body.processed}} />
          <div className="row">{data.fieldImages.map(image => <div key={image.targetId} className="col-md-4"><img className="img-fluid" src={image.derivative.url} alt={image.alt} /></div>)}</div>
        </div>         
    )
  }
}

export default graphql(PROJECT_QUERY, { name: 'projectQuery',
  options: (props) => ({ variables: { id: props.match.params.id  } })
})( ProjectMain );
