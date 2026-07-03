import requireUser from "./requireUser";
import prisma from "../prisma";

const requireOwnership = async (model, resourceId) => {
  const user = await requireUser();

  let resource;

  if (model === "books") {
    resource = await prisma.books.findUnique({
      where: {
        id: Number(resourceId),
      },
    });

    if (!resource) {
      throw new Error("Book not found.");
    }

    if (resource.user_id !== user.id) {
      throw new Error("Unauthorized.");
    }
  }

  else if (model === "quotes") {
    resource = await prisma.quotes.findUnique({
      where: {
        id: Number(resourceId),
      },
      include: {
        book: true,
      },
    });

    if (!resource) {
      throw new Error("Quote not found.");
    }

    if (resource.book.user_id !== user.id) {
      throw new Error("Unauthorized.");
    }
  }

  else if (model === "reflections") {
    resource = await prisma.reflections.findUnique({
      where: {
        id: Number(resourceId),
      },
      include: {
        quote: {
          include: {
            book: true,
          },
        },
      },
    });

    if (!resource) {
      throw new Error("Reflection not found.");
    }

    if (resource.quote.book.user_id !== user.id) {
      throw new Error("Unauthorized.");
    }
  }

  if(model === "doodles"){
  resource = await prisma.doodles.findUnique({
    where:{
      id : Number(resourceId)
     },
     include:{
      quote:{
        include:{
          book : true
        }
      }
     }
  })
    if (!resource) {
    throw new Error("Doodle not found.");
  }
   if (resource.quote.book.user_id !== user.id) {
    throw new Error("Unauthorized.");
  }
  }
  else {
    throw new Error("Unsupported model.");
  }

  return resource;
};

export default requireOwnership;