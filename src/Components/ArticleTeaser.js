import React, { Component } from 'react'
import { Link } from 'react-router-dom'

class ArticleTeaser extends Component {
  render() {
    return (
      <div className="col-md-4">
        <div className="card">
          <img className="card-img-top" src={this.props.project.fieldImage.derivative.url} alt={this.props.project.fieldImage.alt}/>
          <div className="card-body">
              <h3 className="card-title">{this.props.project.title}</h3>
              <Link className="btn btn-primary" to={`/project/${this.props.project.id}/`}>
                {this.props.project.title}
              </Link>
           </div>
        </div>
      </div>
    )
  }
}

export default ArticleTeaser