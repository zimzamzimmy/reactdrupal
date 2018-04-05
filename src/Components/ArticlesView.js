import React, { Component } from 'react'
import ArticleTeaser from './ArticleTeaser';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

class ArticlesView extends Component {
  render() {
    if (this.props.projectsQuery && this.props.projectsQuery.loading) {
        return <div>Loading</div>
    }

    if (this.props.projectsQuery && this.props.projectsQuery.error) {
        return <div>Error</div>
    }
    
    // console.log(this.props.projectsQuery.nodeQuery);
    
    const projectsToRender = this.props.projectsQuery.nodeQuery.entities

    return (
        <div className="row">{projectsToRender.map(project => <ArticleTeaser key={project.id} id={project.id} project={project} />)}</div>
    )
  }
}

const PROJECTS_QUERY = gql`
  query ProjectsQuery {
    nodeQuery(filter: {conditions: [{field: "type", value: ["project"]}]}) {
      count
      entities {
        ...on NodeProject {
          uuid:uuid
          title:title
          id:nid
          fieldImage{
            derivative(style:LARGE){
              url
            }
            alt
          }
          body {
            processed
          }
          entityUrl {
            path
          }
        }
      }
    }
  }`

export default graphql(PROJECTS_QUERY, { name: 'projectsQuery' }) (ArticlesView)
