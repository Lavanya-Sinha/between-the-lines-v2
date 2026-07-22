"use server"

import endDiscussion from "@/lib/discussions/endDiscussion"
import getDiscussion from "@/lib/discussions/getDiscussion"

const EndDiscussion = async({ discussionId })=>{
 await endDiscussion({discussionId})

 return await getDiscussion({ discussionId })
}
export default EndDiscussion
