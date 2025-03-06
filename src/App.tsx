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
  const [data, setData] = useState<FetchResponse | null>(null)

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
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Merchant</th>
            <th>Category</th>
          </tr>
        </thead>
        <tbody>
          {data.transactions.map((transaction, key) => (
            <tr key={key}>
              <td>{transaction.id}</td>
              <td>{formatDateTime(transaction.date)}</td>
              <td>£{transaction.amount}</td>
              <td>{transaction.merchant}</td>
              <td>{transaction.category}</td>
            </tr>
          ))}
        </tbody>
      </table>

      </>
    : 
      <p>No data found</p>}
    </>
  )
}

export default App
