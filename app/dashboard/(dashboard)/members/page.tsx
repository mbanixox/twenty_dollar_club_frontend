import { columns, Payment } from "../../../../components/tables/columns"
import { DataTable } from "../../../../components/tables/data-table"

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "a@example.com",
    },
    {
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "b@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "c@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "d@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "e@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "f@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "g@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "h@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "i@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "j@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "k@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "l@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "m@example.com",
    },{
      id: "728ed52f",
      amount: 100,
      status: "pending",
      email: "n@example.com",
    },
    // ...
  ]
}

export default async function DemoPage() {
  const data = await getData()

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data} />
    </div>
  )
}