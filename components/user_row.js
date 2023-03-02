import React from "react";
import { Tr } from "@chakra-ui/react";
import { Td } from "@chakra-ui/react";
import { FaEdit } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { useRouter } from "next/router";
import styles from "@pages/styles/Home.module.css";

const UserRow = ({ user_data }) => {
  const router = useRouter();

  const editUser = (id) => {
    router.push({
      pathname: `/edit/${id}`,
      query: { email: user_data.email, username: user_data.username },
    });
  };
  const deleteUser = async (id, username) => {
    if (confirm(`Are you sure that you want to delete user ${username}?`)) {
      try {
        const res = await fetch(
          `http://localhost:3000/api/users/delete/${id}`,
          {
            method: "DELETE",
          }
        );
        const data = await res.json();
        alert(`User ${username} deleted succesfully.`);
        router.push("/table");
      } catch (error) {
        alert("Error occured in Deletion.");
      }
    }
  };

  return (
    <Tr id={user_data.id}>
      <Td>{user_data.email}</Td>
      <Td>{user_data.username}</Td>
      <Td>
        <div className={styles.actions}>
          <div
            className={styles.edit}
            onClick={() => {
              editUser(user_data.id);
            }}
          >
            <FaEdit />
          </div>
          <div
            className={styles.delete}
            onClick={() => {
              deleteUser(user_data.id, user_data.username);
            }}
          >
            <FaTrash />
          </div>
        </div>
      </Td>
    </Tr>
  );
};

export default UserRow;
