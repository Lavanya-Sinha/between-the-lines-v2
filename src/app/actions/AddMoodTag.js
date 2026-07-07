"use server";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MoodTagValidation } from "@/lib/validation/MoodTagValidation";

const AddMoodTag = async (formData) => {
  const rawTagName = formData.get("tag_name");
  const quoteId = Number.parseInt(
    formData.get("quote_id")
  );
  const id = formData.get("book_id")

  const validation = MoodTagValidation({tagName: rawTagName})
  if(!validation.success){
    throw new Error(validation.error)
  }
  const {tagName} = validation.data

await requireOwnership("quotes", quoteId);
  const existingTag = await prisma.mood_tags.findFirst({
    where: {
        name : tagName
    }
  })

  let tag;
  if(existingTag){
    tag = existingTag
  }else{
    tag = await prisma.mood_tags.create({
        data : {
            name: tagName
        }
    })
  }

  await prisma.quotes.update({
    where:{
        id : quoteId
    },
    data : {
        mood_tags : {
            connect : {
                id : tag.id
            }
        }
    }
  })
  redirect(`/book/${id}/quote/${quoteId}`);
};

export default AddMoodTag;