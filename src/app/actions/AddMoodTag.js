"use server";
import requireWriteAccess from "@/lib/auth/requireWriteAccess";
import requireOwnership from "@/lib/auth/requireOwnership";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import { MoodTagValidation } from "@/lib/validation/MoodTagValidation";
import { invalidateQuote } from "@/lib/cache/Invalidate";
import log from "@/lib/logging/logger";

const AddMoodTag = async (formData) => {
  try { 
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
  
    await requireWriteAccess()
  
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
  
    const user = await prisma.quotes.update({
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
    await invalidateQuote(quoteId)
     log({
      level: "INFO",
      file: "src/app/actions/AddMoodTag.js",
      operation: "Add Mood Tag",
      message: "Mood Tag Added.",
      userId: user.id,
    });
    redirect(`/book/${id}/quote/${quoteId}`);
  } catch (error) {
     log({
      level: "ERROR",
      file: "src/app/actions/AddMoodTag.js",
      operation: "Add Mood Tag",
      message: "Failed to Add Mood Tag.",
      error: error.message,
    });

    throw error;
  }
};

export default AddMoodTag;