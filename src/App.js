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
import FeedbackPage from './pages/FeedbackPage'
import DeleteAccountPage from './pages/DeleteAccountPage.jsx'

import PrivateRoute from './components/PrivateRoute'
import { AuthProvider } from './context/AuthContext'

function App() {
  return (
    <AuthProvider>
      <Router>
        <Switch>
          <Route path='/' exact component={SignupPage} />
          <PrivateRoute path='/entries' component={AllEntriesPage} />
          <Route path='/login' component={LoginPage} />
          <Route path='/signup' component={SignupPage} />
          <PrivateRoute path='/edit' component={EditEntryPage} />
          <PrivateRoute path='/create' component={NewEntryPage} />
          <PrivateRoute path='/profile' component={ProfilePage} />
          <Route path='/reset' component={ResetPage} />
          <PrivateRoute path='/delete' component={DeleteAccountPage} />
          <PrivateRoute path='/feedback' component={FeedbackPage} />
          <Redirect from='*' to='/' />
        </Switch>
      </Router>
    </AuthProvider>
  )
}

export default App
