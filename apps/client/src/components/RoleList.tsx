import { trpc } from "@/utils/trpc"

export default function RoleList() {
  const roles = trpc.role.all.useQuery()
  console.log({ roles: roles.data })

  return <div>{roles.data?.map((role) => role.name)}</div>
}
