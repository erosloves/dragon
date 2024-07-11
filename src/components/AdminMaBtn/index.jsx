import Link from "next/link";
export function AdminMaBtn({ isLogged }) {
  return (
    <Link
      href={isLogged ? "/api/auth/logout" : "/api/auth/login"}
      style={{
        position: "absolute",
        right: "20px",
        top: "10px",
        width: "100px",
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "20px",
        color: "#fff",
      }}
    >
      {isLogged ? "Logout" : "Login"}
    </Link>
  );
}
export function NavBtn() {
  return (
    <Link
      href={"/adminma"}
      style={{
        position: "absolute",
        right: "20px",
        top: "55px",
        width: "100px",
        backgroundColor: "#333",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "10px",
        borderRadius: "20px",
        color: "#fff",
      }}
    >
      Go back
    </Link>
  );
}
