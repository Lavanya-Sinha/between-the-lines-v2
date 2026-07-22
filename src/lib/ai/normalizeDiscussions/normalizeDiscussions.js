const normalizeDiscussions = (discussion)=>{
return {
    id: discussion.id,
    createdAt: discussion.created_at,
    messages: discussion.messages.map((message)=>{
      return{
        role: message.role.toLowerCase(),
        content: message.content,
      }

    })
}
}
export default normalizeDiscussions