import React, { useEffect, useState, useMemo } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Avatar,
  Typography,
  Tabs,
  TabsHeader,
  Tab,
  Switch,
  Tooltip,
  Button,
} from "@material-tailwind/react";
import { Table, Modal, Input, Select } from "@/components";
import {
  HomeIcon,
  ChatBubbleLeftEllipsisIcon,
  Cog6ToothIcon,
  PencilIcon,
  TrashIcon,
  PlusIcon,
  PencilSquareIcon,
} from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { ProfileInfoCard, MessageCard } from "@/widgets/cards";
import { platformSettingsData, conversationsData, projectsData } from "@/data";
import axios from "@/axios";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export function Users() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [formUser, setFormUser] = useState({
    user_name: "",
    name: "",
    password: "",
    role: "Super Admin",
    email: "",
    gender: "Male",
  });
  const [id, setId] = useState("");

  const dropdownRole = (
    <>
      <option value={"Super Admin"} label="Super Admin" />
      <option value={"Admin"} label="Admin" />
    </>
  );

  const dropdownGender = (
    <>
      <option value={"Male"} label="Male" />
      <option value={"Female"} label="Female" />
    </>
  );

  const columns = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Role",
        accessor: "role",
      },
      {
        Header: "Email",
        accessor: "email",
      },
      {
        Header: "Gender",
        accessor: "gender",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              className="bg-orange-400"
              onClick={() => {
                setFormUser(row.original);
                setOpenModal(true);
                setId(row.original.id);
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => handleDelete(row.original.id)}
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const fetchDataUser = async () => {
    axios.get(`users`).then((res) => {
      let data = [];
      let i = 1;
      res.data.map((x) => {
        data.push({
          no: i,
          ...x,
        });
        i++;
      });
      setData(data);
    });
  };

  const fetchUserById = async (id) => {
    axios.get(`users/${id}`).then((res) => {
      setFormUser(res.data);
    });
  };

  const editDataUser = async (id) => {
    axios
      .patch(
        `users/${id}`,
        (formUser, { password: bcrypt.hash(formUser.password, 10) })
      )
      .then(() => fetchDataUser());
  };

  const handleChange = (e) => {
    console.log("e", e);
    setFormUser({ ...formUser, [e.target.id]: e.target.value });
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/users/${id}`).then((res) => {
        toast.success(res.data.msg, {
          theme: "colored",
        });
        fetchDataUser();
      });
    } catch (err) {
      toast.error(err, {
        theme: "colored",
      });
    }
  };

  const closeModal = () => {
    setOpenModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formUser,
        [e.target.id]: e.target.value,
      };
      if (id) {
        await axios.patch(`/users/${id}`, payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setId("");
          setOpenModal(false);
          fetchDataUser();
        });
      } else {
        await axios.post("/users", payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModal(false);
          fetchDataUser();
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const dataStorage = localStorage.getItem("user");
  const user = JSON.parse(dataStorage);

  useEffect(() => {
    fetchDataUser();
  }, []);

  if (user) {
    return (
      <>
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <div className="mr-5 flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                setFormUser({
                  user_name: "",
                  name: "",
                  password: "",
                  role: "Super Admin",
                  email: "",
                  gender: "Male",
                });
                setOpenModal(true);
              }}
            >
              <PlusIcon className="h-5 w-5" />
              Add Users
            </Button>
            <Modal isOpen={openModal} onClose={closeModal} title="Add User">
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col gap-2 p-5">
                  <Input
                    name="user_name"
                    label="User Name"
                    placeholder="Input user name here"
                    defaultValue={formUser.user_name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="name"
                    label="Name"
                    placeholder="Input display name here"
                    defaultValue={formUser.name}
                    onChange={handleChange}
                    required
                  />
                  <Input
                    name="password"
                    label="Password"
                    placeholder="Input password here"
                    defaultValue={formUser.password}
                    onChange={handleChange}
                    // required
                  />
                  <Select
                    name="role"
                    label="Role"
                    defaultValue={formUser.role}
                    // value={formUser.role}
                    onChange={handleChange}
                    dropdownContent={dropdownRole}
                    required
                  />
                  <Input
                    name="email"
                    label="Email"
                    placeholder="Input email here"
                    type="email"
                    defaultValue={formUser.email}
                    onChange={handleChange}
                    required
                  />
                  <Select
                    name="gender"
                    label="Gender"
                    defaultValue={formUser.gender}
                    onChange={handleChange}
                    dropdownContent={dropdownGender}
                    required
                  />
                </div>
                <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex w-full justify-center rounded-md border border-transparent bg-blue-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
                  >
                    Submit
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => {
                      setOpenModal(false);
                      setFormUser("");
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </Modal>
          </div>
          <Table columns={columns} data={data} title={"Users"} />
        </div>
      </>
    );
  } else {
    navigate("/auth/sign-in");
  }
}

export default Users;
