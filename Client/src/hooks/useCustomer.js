import { useState, useEffect } from 'react'
import customerService from 'services/customer-service'

function useCustomer(customerId) {
  const [customer, setCustomer] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    customerService
      .getById(customerId)
      .then(({ data }) => setCustomer(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { customer, loading, errors }
}

export default useCustomer
