'use client'
import { useForm } from "react-hook-form"
import { RouterInput } from "@repo/server"
import { trpc } from "@/utils/trpc"

const CreateRoleForm = () => {
  const { register, handleSubmit } = useForm<RouterInput["role"]['createOne']>()
  const createRole = trpc.role.createOne.useMutation()

  const onSubmit = async (values: RouterInput["role"]['createOne']) => {
    const res = await createRole.mutateAsync(values)

    alert(`Role ${res.name} created`)
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="name">Name</label>
      <input {...register("name")} />
      <button type="submit">Create</button>
    </form>
  )
}

export default CreateRoleForm
