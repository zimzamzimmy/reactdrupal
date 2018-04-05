import React, { Component } from 'react'
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom'

class ProjectsList extends Component {
  render() {
    if (this.props.projectsQuery && this.props.projectsQuery.loading) {
        return <div>Loading</div>
    }

    if (this.props.projectsQuery && this.props.projectsQuery.error) {
        return <div>Error</div>
    }
    
    const projectsToRender = this.props.projectsQuery.nodeQuery.entities

    return (
        <ul className="list-group">{projectsToRender.map(project => <li className="list-group-item" key={project.id} ><Link to={`/project/${project.id}/`}>{project.title}</Link></li>)}</ul>
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
        }
      }
    }
  }`

export default graphql(PROJECTS_QUERY, { name: 'projectsQuery' }) (ProjectsList)
