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
import ProfilePage from './pages/ProfilePage'
import ResetPage from './pages/ResetPage'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={AllEntriesPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <Route path='/edit' component={EditEntryPage} />
          <Route path='/create' component={NewEntryPage} />
          <Route path='/profile' component={ProfilePage} />
          <Route path='/reset' component={ResetPage}></Route>
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
