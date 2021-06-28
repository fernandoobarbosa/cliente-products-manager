import SideBarMenu from '../components/SideBarMenu'
import FormProduct from '../components/FormProduct'
import api from '../services/api'
import { useHistory } from 'react-router-dom'

export default function NewProduct () {
  const history = useHistory()
  function onSubmitNewProduct (content) {
    api.post('/Products', {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      name: content.name,
      price: parseFloat(content.price),
      description: content.description,
      tags: content.tags,
      imageUrl: content.imgUrl
    })
      .then(function (response) {
        console.log(response)
        history.push('/')
      })
      .catch(function (error) {
        alert(error.request.response)
      })
  }

  return (
    <div>
      <SideBarMenu />
      <FormProduct onSubmitNewProduct={onSubmitNewProduct} />
    </div>
  )
}
