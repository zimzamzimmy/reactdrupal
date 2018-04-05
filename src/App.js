import React, { Component } from 'react'
import ArticlesView from './Components/ArticlesView'
import HomeView from './Components/HomeView'
import ProjectMain from './Components/ProjectMain'
import Header from './Components/Header'
import AboutUs from './Components/AboutUs'
import { Switch, Route } from 'react-router-dom'

// const client = new ApolloClient({
//     uri: "http://bwarch.dd:8083/graphql"
// });

class App extends Component {
  render() {
    return (
      <div>
        <Header/>
        <div className="container">
          <Switch>
            <Route exact path="/" component={HomeView} />
            <Route exact path="/projects" component={ArticlesView} />
            <Route exact path="/project/:id" component={ProjectMain} />
            <Route exact path="/about" component={AboutUs} />
          </Switch>
        </div>
      </div>
    )
  }
}

export default App;