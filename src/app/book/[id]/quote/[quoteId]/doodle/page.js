
import DoodleClient from "./DoodleClient";
import getDoodle from "@/lib/doodles/getDoodle";

const DoodleServer = async ({ params }) => {
  const { quoteId } = await params;
  const { id } = await params;

  const doodle = await getDoodle(quoteId)
  console.log(doodle);

  return (
    <div>
      <DoodleClient doodle={doodle} quoteId={quoteId} id={id} />
    </div>
  );
};
export default DoodleServer;
