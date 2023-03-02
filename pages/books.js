import React from "react";
import { TableContainer } from "@chakra-ui/react";
import { Table } from "@chakra-ui/react";
import { Thead } from "@chakra-ui/react";
import { Tr } from "@chakra-ui/react";
import { Th } from "@chakra-ui/react";
import { Tbody } from "@chakra-ui/react";
import UserRow from "@pages/components/user_row";
import Head from "next/head";
import styles from "@pages/styles/Home.module.css";
import { useRouter } from "next/router";
import { Image } from "@chakra-ui/react";
import { Link } from "@chakra-ui/react";

const table = ({ users_list }) => {
  const router = useRouter();
  function logout() {
    if (confirm("Are you sure you want to log out?")) {
      router.push("/");
    }
  }
  return (
    <>
      <Head>
        <title>Users</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className={styles.navbar}>
        <div className={styles.sections}>
          <Image
            boxSize="40px"
            className={styles.logo_table}
            src="/library_logo.svg"
          />
          <Link href="/table" className={styles.librarians}>
            Librarians
          </Link>
          <Link href="/books">Books</Link>
        </div>

        <button onClick={logout} className={styles.logout_button}>
          Log out
        </button>
      </div>
      <div className={styles.button_container}>
        <button className={styles.add_book}>Add Book</button>
      </div>
      <div>
        <TableContainer>
          <Table variant="simple">
            <Thead>
              <Tr className={styles.header_row}>
                <Th>Email</Th>
                <Th>Username</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {users_list.map((user) => (
                <UserRow user_data={user} />
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </div>
    </>
  );
};

export const getStaticProps = async (context) => {
  let users_list = [];
  try {
    const response = await fetch(`http://localhost:3000/api/users`);

    users_list = await response.json();
  } catch (error) {
    alert("Error in Fetching User List.");
  }
  return {
    props: {
      users_list,
    },
  };
};

export default table;
