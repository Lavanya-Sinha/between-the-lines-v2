import Link from "next/link";
export default async function Home() {
  return (
  <main>
      <h1>Between The Lines</h1>

      <p>
        Your personal reading journal to save books, memorable quotes,
        reflections, doodles, and more.
      </p>

      <Link href="/signup">
        <button>Get Started</button>
      </Link>

      <Link href="/login">
        <button>Log In</button>
      </Link>

      <section>
        <h2>Features</h2>

        <ul>
          <li>📚 Organize your books</li>
          <li>💭 Save meaningful quotes</li>
          <li>📝 Write reflections</li>
          <li>🎨 Create doodles</li>
          <li>🤖 AI-powered reading companion</li>
        </ul>
      </section>
    </main>
  );
}
