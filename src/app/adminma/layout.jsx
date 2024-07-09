import { UserProvider } from "@auth0/nextjs-auth0/client";

export default function Layout({ children }) {
  return (
    <UserProvider>
      <div style={{ position: "relative" }}>{children}</div>
    </UserProvider>
  );
}
