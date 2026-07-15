import getProfile from "@/lib/profile/getProfile";
import Logout from "../actions/Logout";
import Link from "next/link";

const ProfilePage = async () => {
  const profile = await getProfile();
  return (
    <main>
      <Link href="/dashboard">← Back to Dashboard</Link>
      <div>My Profile</div>
      <section>
        <div>👤</div>

        <h2>{profile.displayName}</h2>

        <p>{profile.email}</p>

        <p>
          Signed in with{" "}
          {profile.provider === "GOOGLE" ? "Google" : "Email & Password"}
        </p>
      </section>
      <section>
        <h2>Reading Statistics</h2>

        <p>📚 Books: {profile.stats.books}</p>

        <p>💬 Quotes: {profile.stats.quotes}</p>

        <p>✍️ Reflections: {profile.stats.reflections}</p>

        <p>🎨 Doodles: {profile.stats.doodles}</p>
      </section>
      <section>
        <h2>Appearance</h2>

        <p>Theme settings coming soon.</p>
      </section>
      <form action={Logout}>
        <button type="submit">Log Out</button>
      </form>
    </main>
  );
};
export default ProfilePage;
