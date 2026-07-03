import prisma from "@/lib/prisma";
import DoodleClient from "./DoodleClient";

const DoodleServer = async({ params })=>{
    const { quoteId } = await params;

    const doodle = await prisma.doodles.findUnique({
        where: {
            quote_id: Number(quoteId)
        }
    });

    console.log(doodle);

    return (
        <div>
           <DoodleClient doodle={doodle}/>
        </div>
    );
}
export default DoodleServer
