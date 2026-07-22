import getDiscussion from "@/lib/discussions/getDiscussion";
import DiscussionComposer from "@/app/components/DiscussionComposer";
import EndDiscussionButton from "@/app/components/EndDiscussionButton";
import Link from "next/link";

const DiscussionPage = async ({ params }) => {
  const { discussionId, id, quoteId, reflectionId } = await params;

  const discussion = await getDiscussion({ discussionId });

  return (
    <div>
      <section>
       <Link href={`/book/${id}/quote/${quoteId}/reflection/${reflectionId}`}>← Back to Reflection</Link>
        <h2>{discussion.reflection.quote.book.title}</h2>
        <br />
        <strong>{discussion.reflection.quote.text}</strong>
      </section>
      <hr />
      <section>
        <h2>Your Reflection</h2>
        <br />
        <b>{discussion.reflection.content}</b>
        <br />
      </section>
      <hr />
      {discussion.messages.map((message) => {
        const sender = message.role === "USER" ? "You" : "Between the Lines";

        return (
          <div key={message.id}>
            <h3>{sender}</h3>
            <p>{message.content}</p>
          </div>
        );
      })}
      <section>
        <DiscussionComposer discussionId={discussion.id}/>
        <div>
         <EndDiscussionButton discussionId={discussion.id} />
        </div>
      </section>
    </div>
  );
};
export default DiscussionPage;
