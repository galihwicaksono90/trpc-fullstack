import jwt from "jsonwebtoken"

export type UserAuth = {
  id: string
  role: string
}

export const createToken = (user: UserAuth) => {
  const token = jwt.sign({ user: user }, process.env.TOKEN_SECRET as string, { expiresIn: "1d" })
  return token
}

export const verifyToken = (header?: string) => {
  if (!header) {
    return false
  }

  const token = header.split(" ")[1] || ""
  return jwt.verify(token, process.env.TOKEN_SECRET as string) as { user: UserAuth }
}


