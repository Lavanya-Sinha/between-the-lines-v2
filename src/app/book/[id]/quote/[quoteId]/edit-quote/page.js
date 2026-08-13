import requireUser from "@/lib/auth/requireUser";
import prisma from "@/lib/prisma";

import UpdateQuote from "@/app/actions/UpdateQuote";

import Button from "@/app/components/ui/Button";
import Card from "@/app/components/ui/Card";
import Textarea from "@/app/components/ui/Textarea";

const EditQuotePage = async ({ params }) => {
  await requireUser();

  const { quoteId, id } = await params;

  const quote = await prisma.quotes.findUnique({
    where: {
      id: Number.parseInt(quoteId),
    },
  });

  if (!quote) {
    return (
      <main className="p-10">
        <h1
          style={{
            fontFamily: "var(--font-heading)",

            fontSize: "var(--font-size-3xl)",

            fontWeight: "var(--font-weight-bold)",

            lineHeight: "var(--line-height-heading)",
          }}
        >
          Quote not found.
        </h1>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-6xl flex-col gap-8 p-8">
      <div className="flex flex-col gap-2">
        <h1
          style={{
            fontFamily: "var(--font-heading)",

            fontSize: "var(--font-size-3xl)",

            fontWeight: "var(--font-weight-bold)",

            lineHeight: "var(--line-height-heading)",

            letterSpacing: "var(--letter-spacing-heading)",
          }}
        >
          Edit Quote
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",

            fontSize: "var(--font-size-base)",

            lineHeight: "var(--line-height-body)",

            color: "var(--text-secondary)",
          }}
        >
          Refine the passage you saved.
        </p>
      </div>

      <Card className="p-14">
        <form action={UpdateQuote} className="flex flex-col gap-6">
          <Textarea
            name="text"
            rows={8}
            defaultValue={quote.text}
            style={{
              fontFamily: "var(--font-quote)",
              fontSize: "var(--font-size-xl)",
              lineHeight: "var(--line-height-quote)",
            }}
          />

          <input type="hidden" name="quote_id" value={quote.id} />

          <input type="hidden" name="book_id" value={id} />

          <Button type="submit">Save Changes</Button>
        </form>
      </Card>
    </main>
  );
};

export default EditQuotePage;
