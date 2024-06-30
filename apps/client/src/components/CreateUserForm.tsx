import { RouterInput } from "@repo/server"
import { useForm } from "react-hook-form"
import { trpc } from "@/utils/trpc"

type FormData = RouterInput["user"]['createOne']

const CreateUserForm = () => {
  const { register, handleSubmit } = useForm<FormData>()
  const createUser = trpc.user.createOne.useMutation()
  const allUsers = trpc.user.all.useQuery(undefined, {
    initialData: []
  })

  const utils = trpc.useUtils()

  const onSubmit = async (e: FormData) => {
    console.log(e)
    await createUser.mutateAsync(e)
    utils.user.all.invalidate()
  }

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
        <label htmlFor="name">Name</label>
        <input {...register("name")} />

        <label htmlFor="email">Email</label>
        <input {...register("email")} />
        <label htmlFor="password">Password</label>
        <input {...register("password")} />
        <button type="submit">Create</button>
      </form>
      <ul>
        {allUsers.data.map(user => (
          <li key={user._id}>{user.name} - {user.email}</li>
        ))}
      </ul>
    </div>
  )
}

export default CreateUserForm
