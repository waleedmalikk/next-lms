import Head from "next/head";
import Router, { useRouter } from "next/router";
import {
  FormControl,
  FormLabel,
  InputGroup,
  InputRightElement,
  Button,
  Input,
  Link,
  FormHelperText,
  FormErrorMessage,
  Box,
  Image,
} from "@chakra-ui/react";
import styles from "@pages/styles/Home.module.css";
import * as checks from "@pages/lib/server_checks";

import { useState } from "react";

export default function sign_up() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  async function signUpHandler(e) {
    e.preventDefault();

    if (checks.isStringEmpty(username)) {
      alert("username cannot be empty.");
      return;
    }
    if (!checks.minMax(username, 5, 40)) {
      alert("username length must be between 5 to 40 characters.");
      return;
    }

    if (checks.isStringEmpty(email)) {
      alert("email cannot be empty.");
      return;
    }
    if (!checks.minMax(email, 5, 40)) {
      alert("email length must be between 5 to 40 characters.");
      return;
    }

    if (checks.isStringEmpty(password)) {
      alert("password cannot be empty.");
      return;
    }
    if (!checks.minMax(password, 5, 40)) {
      alert("password length must be between 5 to 40 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username,
        email: email,
        password: password,
      }),
    };

    const response = await fetch(
      "http://localhost:3000/api/users/register",
      requestOptions
    );
    const data = await response.json();
    if (response.status !== 200) {
      alert(data.msg);
    } else {
      router.push("/table");
    }
  }

  return (
    <>
      <Head>
        <title>Sign Up</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <Box className={styles.logo_box}>
          <Image className={styles.logo} src="/library_logo.svg" />
        </Box>
        <form onSubmit={signUpHandler}>
          <div className={styles.form_container1}>
            <div className={styles.form_container2}>
              <FormControl className={styles.form}>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>Username</FormLabel>
                  <Input
                    type="text"
                    placeholder="Enter Username"
                    value={username}
                    onChange={handleUsernameChange}
                  />
                </InputGroup>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>Email</FormLabel>
                  <Input
                    type="email"
                    placeholder="Enter Email"
                    value={email}
                    onChange={handleEmailChange}
                  />
                </InputGroup>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>Password</FormLabel>
                  <Input
                    type="password"
                    placeholder="Enter Password"
                    value={password}
                    onChange={handlePasswordChange}
                  />
                </InputGroup>
                <InputGroup className={styles.group}>
                  <FormLabel className={styles.label}>
                    Confirm Password
                  </FormLabel>
                  <Input
                    type="password"
                    placeholder="Re-Enter Password"
                    value={confirmPassword}
                    onChange={handleConfirmPasswordChange}
                  />
                </InputGroup>
                <Button type="submit" className={styles.login_button}>
                  Sign Up
                </Button>
              </FormControl>
              <Link href="/">Already have an Account? Login Here.</Link>
            </div>
          </div>
        </form>
      </main>
    </>
  );
}
