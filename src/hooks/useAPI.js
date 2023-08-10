import { useState } from 'react'

export function useAPI (loadingDefault = true) {
  const [page, setPage] = useState(1)
  const [pageLimit, setPageLimit] = useState(1)

  const [loading, setLoading] = useState(loadingDefault)
  const [error, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState(null)

  const startRequest = () => {
    setLoading(true)
    setError(false)
    setErrorMessage('')
  }

  const endRequest = ({ newError = false, newErrorMessage = null, totalPages = 1 }) => {
    setLoading(false)
    setError(newError)
    setErrorMessage(newErrorMessage)

    if (totalPages > page) {
      setPage(page + 1)
      setPageLimit(totalPages)
    }
  }

  return {
    page,
    pageLimit,
    loading,
    error,
    errorMessage,
    startRequest,
    endRequest
  }
}
