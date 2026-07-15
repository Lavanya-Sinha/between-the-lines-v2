
import DoodleClient from "./DoodleClient";
import getDoodle from "@/lib/doodles/getDoodle";
import Link from "next/link";

const DoodleServer = async ({ params }) => {
  const { quoteId } = await params;
  const { id } = await params;

  const doodle = await getDoodle(quoteId)
  console.log(doodle);

  return (
    <div>
      <Link href={`/book/${id}/quote/${quoteId}`}>
  ← Back to Quote
</Link>
      <DoodleClient doodle={doodle} quoteId={quoteId} id={id} />
    </div>
  );
};
export default DoodleServer;
