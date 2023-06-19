import {
  Box,
  Button,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
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
  const theme = useTheme();
  const mobile = useMediaQuery(theme.breakpoints.down("md"));
  return (
    <Box
      sx={{
        position: "fixed",
        right: 0,
        left: 0,
        top: 0,
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backdropFilter: "blur(8px)",
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.18)",
      }}
    >
      <Toolbar
        style={{
          padding: "5px",
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
            sx={{
              flexGrow: 1,
              fontFamily: "monospace",
              fontSize: mobile ? "1.2rem" : "1.4rem",
            }}
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
              color: "gray",
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
              sx={{
                flexGrow: 1,
                fontWeight: "500",
                fontSize: mobile ? "1rem" : "1.4rem",
              }}
              onClick={() => router.push("/")}
            >
              Home
            </Typography>
          </Box>
          {!mobile && (
          <Box
            sx={{
              cursor: "pointer",
              color: "gray",

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
              sx={{
                flexGrow: 1,
                fontWeight: "500",
                fontSize: mobile ? "1rem" : "1.4rem",
              }}
            >
              My Posts
            </Typography>
          </Box>)}
          {!mobile && (
          <Box
            sx={{
              cursor: "pointer",
              color: "gray",

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
              sx={{
                flexGrow: 1,
                fontWeight: "500",
                fontSize: mobile ? "1rem" : "1.4rem",
              }}
            >
              Create Post
            </Typography>
          </Box>)}
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
              fontWeight: "600",
              fontStyle: "italic",
              color: "gray",
              fontFamily: "monospace",
              mr: 2,fontSize: mobile ? "1rem":"1.4rem"
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
