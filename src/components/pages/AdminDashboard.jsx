import { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../Context";
import { Form } from "react-bootstrap";
import { PaginationControl } from "react-bootstrap-pagination-control";
import Button from "../Button";
import ModalAlert from "../ModalAlert";
import "./AdminDashboard.css";
import "./UserForm.css";

function AdminDashboard() {
  const RECORDS_PER_PAGE = 10;
  const context = useContext(Context);
  const { getAllUsers, deleteUser, setLoaded } = context;
  const { title, search, nothingFound, modalText } =
    context.text.adminDashboard;
  const [users, setUsers] = useState(null);
  const [filteredUsers, setFilteredUsers] = useState(null);
  const [pageUsers, setPageUsers] = useState(null);
  const [page, setPage] = useState(null);
  const [searchInput, setSearchInput] = useState("");
  const [show, setShow] = useState(false);
  const [deleteValue, setDeleteValue] = useState(null);
  const userItems = pageUsers?.map((user) => (
    <div className="user-list-item" key={user.login}>
      <p className="user-login">{user.login}</p>
      <div className="icon-group">
        <Link to={"/profile/" + user.login}>
          <i className="bi bi-person-circle"></i>
        </Link>
        <i
          className="bi bi-trash3-fill"
          onClick={(e) => handleShowModal(e, user.login)}
        ></i>
      </div>
    </div>
  ));

  useEffect(() => {
    getAllUsers(setUsers);
  }, []);

  useEffect(() => {
    if (users) {
      if (searchInput?.trim().length > 0) {
        setFilteredUsers(
          users.filter((user) =>
            user?.login?.toLowerCase().includes(searchInput.toLowerCase())
          )
        );
      } else {
        setFilteredUsers(users);
      }
    }
  }, [users]);

  useEffect(() => {
    if (filteredUsers?.length > 0) {
      setPage(1);
      getPage(1);
    }
  }, [filteredUsers]);

  useEffect(() => {
    if (pageUsers) {
      setLoaded(true);
    }
  }, [pageUsers]);

  useEffect(() => {
    if (page) {
      getPage(page);
    }
  }, [page]);

  function getPage(currentPage) {
    if (filteredUsers?.length > 0) {
      const indexOfLastRecord = currentPage * RECORDS_PER_PAGE;
      const indexOfFirstRecord = indexOfLastRecord - RECORDS_PER_PAGE;
      setPageUsers(filteredUsers.slice(indexOfFirstRecord, indexOfLastRecord));
    }
  }

  function handleSearch(e) {
    e.preventDefault();
    if (users?.length > 0 && searchInput?.trim().length > 0) {
      setFilteredUsers(
        users.filter((user) =>
          user?.login?.toLowerCase().includes(searchInput.toLowerCase())
        )
      );
    } else if (users?.length > 0) {
      setFilteredUsers(users);
    }
  }

  function handleChange(e) {
    e.preventDefault();
    setSearchInput(e.target.value);
  }

  function handleShowModal(e, login) {
    e.preventDefault();
    setDeleteValue(login);
    setShow(true);
  }

  function handleDeleteUser(allow, login) {
    if (allow) {
      deleteUser(login, setUsers);
    }
  }

  return (
    <div className="admin-dashboard section-padding vertical page-min-height">
      <h1>{title}</h1>
      <Form
        noValidate
        className="search-form sign-form"
        onSubmit={handleSearch}
      >
        <Form.Control
          type="search"
          placeholder={search.searchPlaceholder}
          name="search"
          onChange={handleChange}
          value={searchInput}
        />
        <Button buttonStyle="cta" type="submit">
          {search.searchButton}
        </Button>
      </Form>
      {filteredUsers?.length > 0 ? (
        <div className="pages">
          <div className="user-list">{userItems}</div>
          <PaginationControl
            page={page}
            between={3}
            total={filteredUsers.length}
            limit={RECORDS_PER_PAGE}
            changePage={(page) => {
              setPage(page);
            }}
            ellipsis={1}
          />
        </div>
      ) : (
        <p className="not-found">{nothingFound}</p>
      )}
      <ModalAlert
        show={show}
        setShow={setShow}
        allowFunction={handleDeleteUser}
        modalText={modalText}
        value={deleteValue}
      />
    </div>
  );
}

export default AdminDashboard;
