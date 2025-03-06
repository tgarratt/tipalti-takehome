import { useEffect, useState } from 'react'
import './App.css'

interface Transaction {
  id: number;
  amount: number;
  category: string,
  date: string,
  merchant: string;
}

interface FetchResponse {
  currentPage: number;
  next: {page: number, limit: number}
  totalPages: number;
  transactions: Transaction[];
}

function App() {
  // for storing the api information
  const [data, setData] = useState<FetchResponse | null>(null)

  // logic to fetch the api
  useEffect(() => {
    fetch('https://tip-transactions.vercel.app/api/transactions?page=1')
    .then(response => response.json())
    .then((data : FetchResponse) => setData(data))
  },[])

  const formatDateTime = (dateTime : string): string => {
    const date = new Date(dateTime);

    // format time providing a local TZ
    const formattedTime = new Intl.DateTimeFormat('en-GB', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    }).format(date);

    // format date providing a local TZ
    const formattedDate = new Intl.DateTimeFormat('en-GB', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    }).format(date);

    // combine time and date
    return `${formattedTime} - ${formattedDate}`;
  }

  return (
    <>
    {data ? 
      <>
      <h1 className='font-bold mb-8'>Expenses</h1>
      <table className='border border-gray-300 max-w-7xl w-full text-left capitalize'>
        <thead className='bg-gray-200'>
          <tr>
            <th className='border border-gray-300 p-1'>ID</th>
            <th className='border border-gray-300 p-1'>Date</th>
            <th className='border border-gray-300 p-1'>Amount</th>
            <th className='border border-gray-300 p-1'>Merchant</th>
            <th className='border border-gray-300 p-1'>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((transaction, key) => (
            <tr key={key}>
              <td className='border border-gray-300 p-1'>{transaction.id}</td>
              <td className='border border-gray-300 p-1'>{formatDateTime(transaction.date)}</td>
              <td className='border border-gray-300 p-1'>£{transaction.amount}</td>
              <td className='border border-gray-300 p-1'>{transaction.merchant}</td>
              <td className='border border-gray-300 p-1'>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </>
    : 
      <p>No data found :(</p>}
    </>
  )
}

export default App
