export default function AdminMaBtn({ isLogged }) {
  return (
    <a
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
    </a>
  );
}
