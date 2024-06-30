"use client"
import { FormEvent, useState } from "react"
import { trpc } from "@/utils/trpc"
import { RouterInput } from "@repo/server"
import RoleList from "@/components/RoleList"
import CreateRoleForm from "@/components/CreateRoleForm"

export default function Home() {
  const [formData, setFormData] = useState<RouterInput["user"]["createOne"]>({
    name: "",
    email: "",
    password: ""
  })

  const userQuery = trpc.user.all.useQuery(undefined, {
    initialData: []
  })
  const userMutation = trpc.user.createOne.useMutation()

  const createUser = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    await userMutation.mutateAsync(formData)
    userQuery.refetch()
  }

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24" >
      <form onSubmit={createUser} className="flex flex-col">
        <label htmlFor="name">
          Name
          <input name="name" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
        </label>
        <label htmlFor="email">
          Email
          <input name="email" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} />
        </label>
        <label htmlFor="password">
          Password
          <input name="password" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} type="password" />
        </label>
        <button type="submit">Submit</button>
      </form>

      <ul>
        {userQuery.data.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
      <CreateRoleForm />
      <RoleList />
    </main>
  );
}
