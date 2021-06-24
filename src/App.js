import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom'

import LoginPage from './pages/LoginPage'
import SignupPage from './pages/SignupPage'
import AllEntriesPage from './pages/AllEntriesPage'
import NewEntryPage from './pages/NewEntryPage'
import EditEntryPage from './pages/EditEntryPage'

function App() {
  return (
    <Router>
      <Switch>
        <Route path='/' exact component={AllEntriesPage} />
        <Route path='/login' component={LoginPage} />
        <Route path='/signup' component={SignupPage} />
        <Route path='/edit' component={EditEntryPage} />
        <Route path='/create' component={NewEntryPage} />
        <Redirect from='*' to='/' />
      </Switch>
    </Router>
  )
}

export default App
