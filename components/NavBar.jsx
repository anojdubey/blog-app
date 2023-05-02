import { Box, Button, IconButton, Toolbar, Typography } from "@mui/material";
import logo from "../assets/demologo.png";
import Image from "next/image";
import styles from "../styles/Navbar.module.css";
import { useRouter } from "next/router";
import { deleteCookie } from "cookies-next";

export default function Navbar({ user }) {
  const router = useRouter();
  const handleLogout = () => {
    deleteCookie("username");
    router.push("/");
  };
  return (
    <Box sx={{ mb: "2rem" }}>
      <Toolbar
        style={{
          padding: "5px",
          boxShadow: "5px 5px 8px #888888",
        }}
      >
        <IconButton onClick={() => router.push("/")}>
          <Image
            style={{
              width: "120px",
              height: "auto",
            }}
            src={logo}
            alt="logo"
          />
        </IconButton>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/")}
        >
          <Typography
            className={styles.link}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
            onClick={() => router.push("/")}
          >
            Home
          </Typography>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/myblogs")}
        >
          <Typography
            className={styles.link}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            My Blogs
          </Typography>
        </Box>
        <Box
          sx={{
            cursor: "pointer",
          }}
          onClick={() => router.push("/createblog")}
        >
          <Typography
            className={styles.link}
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Create Blog
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            flexGrow: 1,
            alignItems: "center",
          }}
        >
          <Typography
            sx={{
              textAlign: "end",
              fontWeight: "bold",
              color: "blue",
              mr: 2,
            }}
            variant="h6"
          >
            {user}
          </Typography>
          <Button
            onClick={() => (user ? handleLogout() : router.push("/login"))}
            variant="contained"
            color="primary"
          >
            {user ? "Log Out" : "Log In"}
          </Button>
        </Box>
      </Toolbar>
    </Box>
  );
}
