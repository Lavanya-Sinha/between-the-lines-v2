import getDiscussion from "../discussions/getDiscussion";
import getReflection from "../reflections/getReflection";

export async function buildTitleContext({ discussionId }) {
  const discussion = await getDiscussion({ discussionId });

  const reflection = await getReflection(discussion.reflection_id);

return {
  reflection: {
    content: reflection.content,
  },

  book: {
    title: reflection.quote.book.title,
    author: reflection.quote.book.author,
  },

  quote: {
    text: reflection.quote.text,
  },

  userMessage: discussion.messages.find(
    (message) => message.role === "USER"
  )?.content,

  aiResponse: discussion.messages.find(
    (message) => message.role === "ASSISTANT"
  )?.content,
};
}