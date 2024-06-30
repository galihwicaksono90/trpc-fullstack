import { trpc } from "@/utils/trpc"

export default function RoleList() {
  const roles = trpc.role.all.useQuery(undefined, {
    initialData: []
  })

  return (
    <div>{
      roles.data.map((role) => {
        return (
          <li key={role._id}>{role.name}</li>
        )
      })
    }</div>
  )
}
