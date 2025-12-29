import {Hono} from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { verify } from 'hono/jwt'
import { createBlogInput, updateBlogInput } from "@venkitta/medium_common";

export const blogRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        JWT_SECRET: string
    }, 
    Variables: {
        userId: string;
    }
}>();

blogRouter.use('/*', async (c, next) => {
    const authHeader = c.req.header("authorization");
    
    if(!authHeader){
        return c.json({
            error: "Unauthorized: No authorization header"
        }, 401)
    }
    
    try{
        const user = await verify(authHeader, c.env.JWT_SECRET)

        if(!user.id){
            return c.json({
                message: "Unauthorized: Invalid token payload"
            }, 403)
        }
            c.set("userId", String(user.id))
            await next()

        } catch (e){
        return c.json({
            error: "Unauthorized: Invalid token"
        }, 401)
    }
});

const getPrismaClient = (databaseUrl: string) => { 
    return new PrismaClient({
    datasourceUrl: databaseUrl,
  }).$extends(withAccelerate())
}


blogRouter.post('/', async (c) => {
  const authorId = c.get("userId")
  const prisma = getPrismaClient(c.env.DATABASE_URL)
  
  try {
    const body = await c.req.json();
    const { success } = createBlogInput.safeParse(body);

    if(!success){
        return c.json({
      message: "Inputs are not correct"
    }, 400)
    }

    const blog = await prisma.blog.create({
        data: {
            title: body.title,
            content: body.content,
            authorId: Number(authorId)
            }
        });
        return c.json({
            id: blog.id,
            message: "Blog created successfully"
        }, 201)

    } catch (e) {
    console.error("Error creating blog:", e);
    return c.json({ message: "Error while creating blog" }, 500);
  }
})

blogRouter.put('/', async(c) => {
  const authorId = c.get("userId")
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    const body = await c.req.json();

    const { success } = updateBlogInput.safeParse(body);

    if(!success){
        return c.json({
      message: "Inputs are not correct"
    }, 400)
    }

    const blog = await prisma.blog.update({
        where: {
            id: body.id,
            authorId: Number(authorId)
        },
        data: {
            title: body.title,
            content: body.content,
            }
        });

        return c.json({
            id: blog.id,
            message: "Blog updated successfully"
        }, 200)

    } catch (e) {
    console.error("Error updating blog:", e);
    return c.json({ message: "Error while updating blog" }, 403);
  }
})

blogRouter.delete('/:id', async(c) => {
  const authorId = c.get("userId")
  const blogId = c.req.param("id")
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    await prisma.blog.delete({
        where: {
            id: Number(blogId),
            authorId: Number(authorId)
            },
        });

        return c.json({
            message: "Blog deleted successfully"
        }, 200)

    } catch (e) {
    console.error("Error deleting blog:", e);
    return c.json({ message: "Error while deleting blog" }, 403);
  }
})

blogRouter.get('/bulk', async(c) => {
  const prisma = getPrismaClient(c.env.DATABASE_URL)
  
  try {
    const blogs = await prisma.blog.findMany({
        select: {
            content: true,
            title: true,
            id: true,
            publishedDate: true,
            author: {
                select: {
                name: true
                }
            }
        }
    })
    return c.json({
        blogs
    })
    } catch (e) {
    console.error("Error fetching blog:", e);
    return c.json({ message: "Error while fetching blog" }, 500);
  }
})

blogRouter.get('/:id', async(c) => {
  const blogId = c.req.param('id')
  const prisma = getPrismaClient(c.env.DATABASE_URL)

  try {
    const blog = await prisma.blog.findFirst({
        where: {
            id: Number(blogId)
        },
        select: {
            id: true,
            title: true,
            content: true,
            publishedDate: true,
            author: {
                select: {
                    name: true
                }
            }
        }
    })
        return c.json({
            blog
        }, 200)
    } catch (e) {
    console.error("Error fetching blog:", e);
    return c.json({ message: "Error while fetching blog" }, 500);
  }
})
