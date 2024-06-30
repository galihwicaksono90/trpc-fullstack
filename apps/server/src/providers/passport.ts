import passport from "passport"
import { Strategy, ExtractJwt } from "passport-jwt"
import { getOneById } from "../modules/user/user.service"

const strategy = new Strategy({
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret"
},
  async (jwtPayload: { id: string, role: string }, done) => {
    console.log({ jwtPayload })
    try {
      const user = await getOneById(jwtPayload.id)
      if (!user) {
        return done(null, false)
      }
      return done(null, {
        id: user._id,
        role: user.role
      })
    } catch (e) {
      return done(e, false)
    }
  }
)

export function registerPassport() {
  console.log("initialize passport")
  passport.use(strategy)
}
