"use client"

import { useEffect, useCallback } from "react"
import { useAtom } from "jotai"
import InfiniteScroll from "react-infinite-scroll-component"
import { Spinner } from "../components/spinner"
import {
  expensesAtom,
  pageAtom,
  loadingAtom,
  hasMoreAtom
} from "../store/expensesAtom"
import { fetchExpenses } from "../utils/client-apis/fetch-expenses"

import { FaceSmileIcon, CurrencyDollarIcon } from "@heroicons/react/24/solid"

const ExpensesPage: React.FC = () => {
  const [expenses, setExpenses] = useAtom(expensesAtom)
  const [page, setPage] = useAtom(pageAtom)
  const [loading, setLoading] = useAtom(loadingAtom)
  const [hasMore, setHasMore] = useAtom(hasMoreAtom)

  const loadExpenses = useCallback(async () => {
    if (loading) return
    setLoading(true)
    try {
      const newExpenses = await fetchExpenses(page)
      setExpenses((prevExpenses) => [...prevExpenses, ...newExpenses])
      setHasMore(newExpenses.length > 0)
      setPage((prevPage) => prevPage + 1)
    } catch (error) {
      console.error("Error fetching expenses:", error)
    } finally {
      setLoading(false)
    }
  }, [loading, page, setExpenses, setLoading, setPage, setHasMore])

  useEffect(() => {
    loadExpenses()
  }, []) // Only run once on mount

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
      <h1 className="text-3xl font-bold mb-6 text-gray-800 dark:text-gray-200 text-center">
        Expenses
      </h1>
        <InfiniteScroll
          dataLength={expenses.length}
          next={loadExpenses}
          hasMore={hasMore}
          loader={<Spinner />}
          height={'100vh'}
          style={{ overflow: 'scroll' }}
          endMessage={
            <div className="flex flex-col items-center justify-center py-6">
              <FaceSmileIcon className="h-16 w-16 text-yellow-500" />
              <p className="mt-4 text-lg text-gray-800 dark:text-gray-200">
                That&apos;s all folks!
              </p>
            </div>
          }
        >
          <div className="space-y-4">
            {expenses.map((expense) => (
              <div
                key={expense.id}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-gray-100 flex items-center"
              >
                <CurrencyDollarIcon className="h-16 w-16 text-green-500 mr-4" />
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">
                    {expense.description}
                  </h3>
                  <p className="text-gray-700 dark:text-gray-300">
                    {expense.amount} {expense.currency}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </InfiniteScroll>
      </div>
  )
}

export default ExpensesPage
