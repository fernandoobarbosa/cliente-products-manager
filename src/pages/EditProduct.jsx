import SideBarMenu from '../components/SideBarMenu'
import EditFormProduct from '../components/EditFormProduct'
import Loading from '../components/Loading'
import { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import api from '../services/api'

export default function EditProduct () {
  const history = useHistory()
  const [product, setProduct] = useState({})
  const [loading, setLoading] = useState(false)
  const params = useParams()
  useEffect(() => {
    setLoading(true)
    if (params.id !== undefined) { loadNote() }
  }, [])

  function loadNote () {
    api.get(`/Products/${params.id}`)
      .then(function (response) {
        setProduct(response.data)
        setLoading(false)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  function onSubmitUpdateProduct (content) {
    console.log(product)
    api.put(`/Products/${product.id}`, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Authorization',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
        'Content-Type': 'application/json;charset=UTF-8'
      },
      id: product.id,
      name: content.name,
      price: parseFloat(content.price),
      description: content.description,
      tags: content.tags,
      imageUrl: content.imgUrl
    })
      .then(function (response) {
        history.push('/')
      })
      .catch(function (error) {
        console.log(error.request.response)
        alert(error.request.response)
      })
  }

  if (!loading) {
    return (
      <div>
        <SideBarMenu />
        <EditFormProduct product={product} onSubmitUpdateProduct={onSubmitUpdateProduct} />
      </div>
    )
  } else {
    return (<Loading />)
  }
}
