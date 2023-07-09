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
import { isNull } from "lodash";

export function Trainings() {
  const [data, setData] = useState([]);
  const [openModalTitle, setOpenModalTitle] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formTitle, setFormTitle] = useState({
    title: ""
  });
  const [id, setId] = useState("");
  const [mode, setMode] = useState('');

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
        Header: "Title",
        accessor: "title",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              className="bg-orange-400"
              onClick={() => {
                setFormTitle(row.original);
                setMode('Edit');
                setOpenModal(true);
                setId(row.original.id);
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                console.log(row)
                setId(row.original.id);
                setOpenDeleteModal(true);
              }}
            >
              <TrashIcon className="h-5 w-5" />
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  const fetchDataTitle = async () => {
    axios.get(`main-titles`).then((res) => {
      let data = [];
      let i = 1;
      const filtered = res.data.filter((x)=> x.deletedAt == null)
      filtered.map((x) => {
        data.push({
          no: i,
          ...x,
        });
        i++;
      });
      setData(data);
    });
  };

  const deleteTitle = async () => {
    try {
      await axios.delete(`/main-titles/${id}`).then((res) => {
        toast.success(`${res.data.msg}`, {
          theme: "colored",
        });
        setOpenDeleteModal(false);
        setId('');
        fetchDataTitle();
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const handleChange = (e) => {
    setFormTitle({ ...formTitle, [e.target.id]: e.target.value });
  };

  const closeModalTitle = () => {
    setOpenModalTitle(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formTitle,
        [e.target.id]: e.target.value,
      };
      if (id) {
        await axios.patch(`/main-titles/${id}`, payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalTitle(false);
          fetchDataTitle();
        });
      } else {
        await axios.post("/main-titles", payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalTitle(false);
          fetchDataTitle();
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    fetchDataTitle();
  }, []);

  return (
    <>
      <div className="mt-12 mb-8 flex flex-col gap-12">
        <div className="mr-5 flex justify-end">
          <Button
            className="flex items-center gap-2"
            onClick={() => {
              setFormTitle({
                title: ""
              });
              setOpenModalTitle(true);
              setMode('Add');
              setId(null);
            }}
          >
            <PlusIcon className="h-5 w-5" />
            Add Users
          </Button>
          <Modal isOpen={openModalTitle} onClose={closeModalTitle} title={`${mode} Title`}>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-2 p-5">
                <Input
                  name="title"
                  label="Title"
                  placeholder="Input title here"
                  defaultValue={formTitle.title}
                  onChange={handleChange}
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
                    setOpenModalTitle(false);
                    setFormTitle({
                      title: "",
                    });
                  }}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>
        </div>
        <Table columns={columns} data={data} title={"Title"} />
      </div>
      <Modal
        isOpen={openDeleteModal}
        onClose={closeDeleteModal}
        title="Delete User"
      >
        <div className="flex flex-col gap-2 p-5">
          Are you sure want to delete this data?
        </div>
        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
          <button
            type="button"
            className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={()=> deleteTitle()}
          >
            Yes
          </button>
          <button
            type="button"
            className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
            onClick={() => {
              setOpenDeleteModal(false);
              setId('');
            }}
          >
            No
          </button>
        </div>
      </Modal>
    </>
  );
}

export default Trainings;
