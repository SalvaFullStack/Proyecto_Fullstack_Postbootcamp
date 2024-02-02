import { useState, useEffect } from 'react'
import customerService from 'services/customer-service'

function useCustomers() {
  const [customers, setCustomers] = useState([])
  const [loading, setLoading] = useState(true)
  const [errors, setErrors] = useState(null)

  useEffect(() => {
    customerService
      .get()
      .then(({ data }) => setCustomers(data))
      .catch(errors => setErrors(errors))
      .finally(() => setLoading(false))
  }, [])
  return { customers, loading, errors, setCustomers }
}

export default useCustomers
