// This file receives a reflection ID and assembles everything
// the AI needs to discuss that reflection.

import getReflection from "../reflections/getReflection";
import getDiscussions from "../discussions/getDiscussions";
import normalizeDiscussions from "./normalizeDiscussions/normalizeDiscussions";
import getDiscussion from "../discussions/getDiscussion";

export async function buildDiscussionContext({ discussionId }) {
  // Fetch all required data
  const discussion = await getDiscussion({ discussionId });
  const reflection = await getReflection(discussion.reflection_id);
  const discussions = await getDiscussions({ reflectionId: discussion.reflection_id });

  const activeDiscussion = discussion
  const previousDiscussion = discussions.find(
  discussion => discussion.ended_at !== null
);

  // Build and return a normalized context object
  return {
    reflection: {
      id: reflection.id,
      content: reflection.content,
      createdAt: reflection.created_at,
    },

    quote: {
      id: reflection.quote.id,
      text: reflection.quote.text,
    },

    book: {
      title: reflection.quote.book.title,
      author: reflection.quote.book.author,
      genres: reflection.quote.book.genres,
    },

   activeDiscussion: normalizeDiscussions(activeDiscussion),

   previousDiscussion:  previousDiscussion
    ? normalizeDiscussions(previousDiscussion)
    : undefined,
  };
}