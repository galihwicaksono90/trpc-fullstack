'use client'
import { useForm } from "react-hook-form"
import { RouterInput } from "@repo/server"
import { trpc } from "@/utils/trpc"

const CreateRoleForm = () => {
  const { register, handleSubmit } = useForm<RouterInput["auth"]['login']>()
  const login = trpc.auth.login.useMutation()
  const me = trpc.auth.me.useQuery()
  const utils = trpc.useUtils()

  const onSubmit = async (values: RouterInput["auth"]['login']) => {
    const res = await login.mutateAsync(values)
    if (!res.token) {
      return
    }
    localStorage.setItem("token", res.token)
    utils.auth.me.invalidate()
  }

  return (
    <div><form onSubmit={handleSubmit(onSubmit)} >
      <label htmlFor="email" > Email </label>
      < input {...register("email")} />
      <label htmlFor="Password" > Password </label>
      < input {...register("password")} />
      < button type="submit" > Create </button>
    </form>
      <pre>{JSON.stringify(me.data, null, 4)}</pre>
    </div>
  )
}

export default CreateRoleForm
