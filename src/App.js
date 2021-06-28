import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Products from './pages/Products'
import NewProduct from './pages/NewProduct'
import EditProduct from './pages/EditProduct'

function App () {
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/' exact component={Products} />
        <Route path='/Products/New' exact component={NewProduct} />
        <Route path='/Products/:id' exact component={EditProduct} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
