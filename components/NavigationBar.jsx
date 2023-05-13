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
    <Box
      sx={{
        mb: "2rem",
        position: "fixed",
        right: 0,
        left: 0,
        top: 0,
        zIndex: 1000,
        backdropFilter: "blur(5px)",
      }}
    >
      <Toolbar
        style={{
          padding: "5px",
          boxShadow: "5px 5px 8px #888888",
          width: "100%",
        }}
      >
        <IconButton onClick={() => router.push("/")}>
          {/* <Image
            style={{
              width: "120px",
              height: "auto",
            }}
            src={logo}
            alt="logo"
          /> */}
          <Typography
            variant="h6"
            color={"black"}
            fontWeight={"700"}
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Prodemic
          </Typography>
        </IconButton>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexGrow: 1,
            justifyContent: "center",
          }}
        >
          <Box
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
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
              "&:hover": {
                color: "blue",
              },
            }}
            onClick={() => router.push("/myblogs")}
          >
            <Typography
              className={styles.link}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              My Posts
            </Typography>
          </Box>
          <Box
            sx={{
              cursor: "pointer",
              "&:hover": {
                color: "blue",
              },
            }}
            onClick={() => router.push("/createblog")}
          >
            <Typography
              className={styles.link}
              variant="h6"
              component="div"
              sx={{ flexGrow: 1 }}
            >
              Create Post
            </Typography>
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "flex-end",
          }}
        >
          <Typography
            sx={{
              textAlign: "end",
              fontWeight: "bold",
              fontStyle: "italic",
              fontFamily: "monospace",
              color: "Black",
              mr: 2,
            }}
            variant="h6"
          >
            {user}
          </Typography>
          <Button
            onClick={() => (user ? handleLogout() : router.push("/login"))}
            sx={{
              textAlign: "center",
              textTransform: "none",
            }}
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
