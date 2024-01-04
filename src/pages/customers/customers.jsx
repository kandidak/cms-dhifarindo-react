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
import axios from "@/axios";
import bcrypt from "bcryptjs";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";

export function Contact() {
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
        Header: "Phone Number",
        accessor: "phoneNumber",
        Cell: ({value}) => value || '-',
      },
      {
        Header: "Company Name",
        accessor: "companyName",
        Cell: ({value}) => value || '-',
      },
      {
        Header: "Number of Employee",
        accessor: "numberOfEmployee",
        Cell: ({value}) => value || '-',
      },
      {
        Header: "Product",
        accessor: "product",
        Cell: ({value}) => value || '-',
      },
      {
        Header: "Tanggal",
        accessor: "createdAt",
        Cell: ({ value }) => dayjs(value).format('DD MMM YYYY'),
      },
    ],
    []
  );

  const fetchDataUser = async () => {
    axios.get(`contacts`).then((res) => {
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
    axios.get(`contacts/${id}`).then((res) => {
      setFormUser(res.data);
    });
  };

  const editDataUser = async (id) => {
    axios
      .patch(
        `contacts/${id}`,
        (formUser, { password: bcrypt.hash(formUser.password, 10) })
      )
      .then(() => fetchDataUser());
  };

  const handleChange = (e) => {
    console.log("e", e);
    setFormUser({ ...formUser, [e.target.id]: e.target.value });
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
        await axios.patch(`/contacts/${id}`, payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModal(false);
          fetchDataUser();
        });
      } else {
        await axios.post("/contacts", payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
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
          <Table columns={columns} data={data} title={"Customers"} />
        </div>
      </>
    );
  } else {
    navigate("/auth/sign-in");
  }
}

export default Contact;
