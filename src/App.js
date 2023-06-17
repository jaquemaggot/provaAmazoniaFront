import { BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Home from './components/pages/Home'
import NewUser from './components/pages/NewUser'

import Container from './components/layout/Container'
import Navbar from './components/layout/Navbar'
import Footer from './components/layout/Footer'
import Users from './components/pages/Users'
import User from './components/pages/User'

function App() {
  return (
    <Router>
      <Navbar/>
      <Container customClass="min-height">
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path='/users' element={<Users />} />
          <Route path='/newuser' element={<NewUser />} />
          <Route path='/user/:id' element={<User />} />
        </Routes>
      </Container>
      <Footer/>
    </Router>
  )
}

export default App;
