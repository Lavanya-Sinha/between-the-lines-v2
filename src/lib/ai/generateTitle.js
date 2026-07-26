import { buildTitleContext } from "./buildTitleContext"
import { createTitleMessages } from "./prompts"
import { generateResponse } from "./provider"

const generateTitle = async({ discussionId })=>{
const context = await buildTitleContext({discussionId})
const messages = createTitleMessages(context)
return await generateResponse(messages)
}
export default generateTitle