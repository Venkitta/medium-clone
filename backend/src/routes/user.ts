import {Hono} from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from 'hono/jwt'
import { signinInput, signupInput } from "@venkitta/medium_common";

export const userRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string
    }
}>();

const getPrismaClient = (databaseUrl: string) => { 
    return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
}

userRouter.post('/signup', async (c) => {
  const body = await c.req.json()
  const { success } = signupInput.safeParse(body)

  if(!success){
    return c.json({
      message: "Inputs are not correct"
    }, 400)
  }

  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.create({
      data: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    })

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET,
  )

    return c.text(jwt)

  } catch (e) {
    return c.json({
            error: "Error during signup:"
        }, 500)
  }
})

userRouter.post('/signin', async(c) => {
  const body = await c.req.json()
  const { success } = signinInput.safeParse(body)

  if(!success){
    return c.json({
      message: "Inputs are not correct"
    }, 400)
  }

  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    const user = await prisma.user.findFirst({
      where: {
        username: body.username,
        password: body.password,
        name: body.name
      }
    })

    if(!user){
      return c.json({
            error: "Invalid username or password"
        }, 401)
    }

    const jwt = await sign({
      id: user.id
    }, c.env.JWT_SECRET)

    return c.text(jwt)
    
  } catch (e) {
    return c.json({
            error: "Error while signing in"
        }, 500)
  }
})
