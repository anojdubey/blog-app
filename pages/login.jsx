import { useState } from "react";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import { css } from "@emotion/react";
import Navbar from "@/components/NavigationBar";
import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import { getCookies } from "cookies-next";

const formStyle = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px;
  border-radius: 8px;
  background-color: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);

  h1 {
    margin-bottom: 16px;
    color: #333333;
    font-size: 24px;
    font-weight: 600;
  }

  .MuiTextField-root {
    margin-bottom: 16px;
  }

  .MuiButton-root {
    margin-top: 16px;
    padding: 12px 24px;
    border-radius: 999px;
    font-size: 16px;
    font-weight: 600;
    text-transform: capitalize;
  }
`;

function LoginForm() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const req = { username, password };
    const response = await fetch(
      "https://blog-app-nu-olive.vercel.app/api/login",
      {
        mode: "cors",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req),
      }
    );
    const data = await response.json();
    router.push("/");
  };

  return (
    <>
      <Navbar />
      <Container
        sx={{
          border: "1px solid gray",
          borderRadius: "8px",
          padding: "24px",
          mt: "6rem",
        }}
        maxWidth="sm"
      >
        <form css={formStyle} onSubmit={handleSubmit}>
          <h1
            style={{
              marginBottom: 16,
              textAlign: "center",
            }}
          >
            Log In
          </h1>
          <TextField
            sx={{
              mb: 2,
            }}
            fullWidth
            label="User Name"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            sx={{
              mb: 2,
            }}
            fullWidth
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="primary" type="submit">
              Log In
            </Button>
          </Box>
        </form>
        <Typography
          sx={{
            textAlign: "center",
            mt: 2,
            color: "blue",
            cursor: "pointer",
          }}
          variant="body2"
          onClick={() => router.push("/signup")}
        >
          Don't have an account? Click here to{" Sign Up"}
        </Typography>
      </Container>
    </>
  );
}

export const getServerSideProps = async (req, res) => {
  const cookie = getCookies(req);
  if (cookie.username) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  return {
    props: {},
  };
};

export default LoginForm;
