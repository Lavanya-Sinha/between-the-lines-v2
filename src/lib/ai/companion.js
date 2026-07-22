// This file orchestrates everything that's in this forlder

import { buildDiscussionContext } from "./context";
import { createDiscussionMessages } from "./prompts";
import { generateResponse } from "./provider";

const companion = async ({ discussionId }) => {
  const context = await buildDiscussionContext({
    discussionId
  });

  const messages = createDiscussionMessages(context);
  console.log("CONTEXT: ", context);
  
  return await generateResponse(messages);
};

export default companion;