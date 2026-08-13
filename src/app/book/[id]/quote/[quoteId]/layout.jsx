import QuoteRealtimeProvider from "@/app/components/QuoteRealTImeProvider";

export default async function QuoteLayout({
    children,
    params,
}) {
    const { quoteId } = await params;
    console.log("Layout quoteId:", quoteId);

    return (
        <QuoteRealtimeProvider quoteId={quoteId}>
            {children}
        </QuoteRealtimeProvider>
    );
}