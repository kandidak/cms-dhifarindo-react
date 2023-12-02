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
import { Table, Modal, Input, Select, FileUploader } from "@/components";
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
import { toast } from "react-toastify";
import { data } from "autoprefixer";
import { useNavigate } from "react-router-dom";

export function Trainings() {
  const navigate = useNavigate();
  const [idTitle, setIdTitle] = useState("");
  const [dataTitle, setDataTitle] = useState([]);
  const [openModalTitle, setOpenModalTitle] = useState(false);
  const [dataContent, setDataContent] = useState([]);
  const [openModalContent, setOpenModalContent] = useState(false);
  const [dataTujuan, setDataTujuan] = useState([]);
  const [openModalTujuan, setOpenModalTujuan] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [formTitle, setFormTitle] = useState({
    title: "",
  });
  const [formContent, setFormContent] = useState({
    listMateri: "",
  });
  const [formTujuan, setFormTujuan] = useState({
    listTujuan: "",
  });
  const [id, setId] = useState("");
  const [mode, setMode] = useState("");
  const [category, setCategory] = useState("");
  const [selectedFile, setSelectedFile] = useState({
    file: "",
    name: "",
  });

  const handleFileSelect = (file) => {
    console.log("file", file);
    setSelectedFile({
      file: file,
      name: file.name,
    });
  };

  const dropdownTitle = (
    <>
      <option value={null}></option>
      {dataTitle.map((x) => (
        <option value={x.id} label={x.title} />
      ))}
    </>
  );

  const columnsTitle = useMemo(
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
        Header: "File",
        accessor: "images",
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
                setSelectedFile({
                  name: row.original.images,
                });
                setMode("Edit");
                setOpenModalTitle(true);
                setId(row.original.id);
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                console.log(row);
                setId(row.original.id);
                setOpenDeleteModal(true);
                setCategory("Title");
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

  const columnsContent = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Content",
        accessor: "listMateri",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              className="bg-orange-400"
              onClick={() => {
                setFormContent(row.original);
                setMode("Edit");
                setOpenModalContent(true);
                setId(row.original.id);
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                console.log(row);
                setId(row.original.id);
                setOpenDeleteModal(true);
                setCategory("Content");
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

  const columnsTujuan = useMemo(
    () => [
      {
        Header: "No.",
        accessor: "no",
      },
      {
        Header: "Tujuan",
        accessor: "listTujuan",
      },
      {
        Header: "Action",
        accessor: "id",
        Cell: ({ row }) => (
          <div className="flex gap-2">
            <Button
              className="bg-orange-400"
              onClick={() => {
                setFormTujuan(row.original);
                console.log("row tujuan", row);
                setMode("Edit");
                setOpenModalTujuan(true);
                setId(row.original.id);
              }}
            >
              <PencilSquareIcon className="h-5 w-5" />
            </Button>
            <Button
              className="bg-red-500"
              onClick={() => {
                console.log(row);
                setId(row.original.id);
                setOpenDeleteModal(true);
                setCategory("Tujuan");
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
      const filtered = res.data.filter((x) => x.deletedAt == null);
      filtered.map((x) => {
        data.push({
          no: i,
          ...x,
        });
        i++;
      });
      setDataTitle(data);
    });
  };

  const deleteTitle = async () => {
    try {
      await axios.delete(`/main-titles/${id}`).then((res) => {
        toast.success(`${res.data.msg}`, {
          theme: "colored",
        });
        setOpenDeleteModal(false);
        setId("");
        fetchDataTitle();
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const handleChangeTitle = (e) => {
    setFormTitle({ ...formTitle, [e.target.id]: e.target.value });
  };

  const closeModalTitle = () => {
    setOpenModalTitle(false);
  };

  const closeDeleteModal = () => {
    setOpenDeleteModal(false);
  };

  const handleSubmitTitle = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("file", selectedFile?.file);

      await axios.post("/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const payload = {
        ...formTitle,
        [e.target.id]: e.target.value,
        images: selectedFile?.name.replace(/ /g, "-"),
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

  const fetchDataContent = async (idJudul) => {
    if (idJudul) {
      axios.get(`main-contents/${idJudul}`).then((res) => {
        let data = [];
        let i = 1;
        const filtered = res.data.filter((x) => x.deletedAt == null);
        filtered.map((x) => {
          data.push({
            no: i,
            ...x,
          });
          i++;
        });
        setDataContent(data);
      });
    }
  };

  const deleteContent = async () => {
    try {
      await axios.delete(`/main-contents/${id}`).then((res) => {
        toast.success(`${res.data.msg}`, {
          theme: "colored",
        });
        setOpenDeleteModal(false);
        setId("");
        fetchDataContent(idTitle);
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const handleChangeContent = (e) => {
    setFormContent({ ...formContent, [e.target.id]: e.target.value });
  };

  const closeModalContent = () => {
    setOpenModalContent(false);
  };

  const handleSubmitContent = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        idJudul: idTitle,
        ...formContent,
        [e.target.id]: e.target.value,
      };
      if (id) {
        await axios.patch(`/main-contents/${id}`, payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalContent(false);
          fetchDataContent(idTitle);
        });
      } else {
        await axios.post("/main-contents", payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalContent(false);
          fetchDataContent(idTitle);
        });
      }
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const fetchDataTujuan = async (idJudul) => {
    if (idJudul) {
      axios.get(`main-tujuans/${idJudul}`).then((res) => {
        let data = [];
        let i = 1;
        const filtered = res.data.filter((x) => x.deletedAt == null);
        filtered.map((x) => {
          data.push({
            no: i,
            ...x,
          });
          i++;
        });
        setDataTujuan(data);
      });
    }
  };

  const deleteTujuan = async () => {
    try {
      await axios.delete(`/main-tujuans/${id}`).then((res) => {
        toast.success(`${res.data.msg}`, {
          theme: "colored",
        });
        setOpenDeleteModal(false);
        setId("");
        fetchDataTujuan(idTitle);
      });
    } catch (error) {
      toast.error(`${error}`, {
        theme: "colored",
      });
    }
  };

  const handleChangeTujuan = (e) => {
    setFormTujuan({ ...formTujuan, [e.target.id]: e.target.value });
  };

  const closeModalTujuan = () => {
    setOpenModalTujuan(false);
  };

  const handleSubmitTujuan = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        idJudul: idTitle,
        ...formTujuan,
        [e.target.id]: e.target.value,
      };
      if (id) {
        await axios.patch(`/main-tujuans/${id}`, payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalTujuan(false);
          fetchDataTujuan(idTitle);
        });
      } else {
        await axios.post("/main-tujuans", payload).then((res) => {
          toast.success(`${res.data.msg}`, {
            theme: "colored",
          });
          setOpenModalTujuan(false);
          fetchDataTujuan(idTitle);
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
    fetchDataTitle();
  }, []);

  useEffect(() => {
    fetchDataContent(idTitle);
    fetchDataTujuan(idTitle);
  }, [idTitle]);

  if (user) {
    return (
      <>
        <div className="mt-12 mb-8 flex flex-col gap-12">
          <div className="mr-5 flex justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                setFormTitle({
                  title: "",
                });
                setOpenModalTitle(true);
                setMode("Add");
                setId(null);
              }}
            >
              <PlusIcon className="h-5 w-5" />
              Add Title
            </Button>
          </div>
          <Table columns={columnsTitle} data={dataTitle} title={"Title"} />

          <div className="rounded-xl border border-2 bg-white p-6">
            <Select
              name="title"
              label="Select Title"
              defaultValue={idTitle}
              // value={formUser.role}
              onChange={(e) => setIdTitle(e.target.value)}
              dropdownContent={dropdownTitle}
            />
          </div>

          <div className="mr-5 flex items-center justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                setFormContent({
                  listMateri: "",
                });
                setOpenModalContent(true);
                setMode("Add");
                setId(null);
              }}
            >
              <PlusIcon className="h-5 w-5" />
              Add Content
            </Button>
          </div>
          <Table
            columns={columnsContent}
            data={dataContent}
            title={"Content"}
          />

          <div className="mr-5 flex items-center justify-end">
            <Button
              className="flex items-center gap-2"
              onClick={() => {
                setFormTujuan({
                  listTujuan: "",
                });
                setOpenModalTujuan(true);
                setMode("Add");
                setId(null);
              }}
            >
              <PlusIcon className="h-5 w-5" />
              Add Tujuan
            </Button>
          </div>
          <Table columns={columnsTujuan} data={dataTujuan} title={"Tujuan"} />
        </div>

        <Modal
          isOpen={openModalTitle}
          onClose={closeModalTitle}
          title={`${mode} Title`}
        >
          <form onSubmit={handleSubmitTitle}>
            <div className="flex flex-col gap-5 p-5">
              <div className="flex flex-col gap-2">
                <Input
                  name="title"
                  label="Title"
                  placeholder="Input title here"
                  defaultValue={formTitle.title}
                  onChange={handleChangeTitle}
                  required
                />
              </div>
              <div className="flex flex-col gap-2">
                <label>Upload File PDF</label>
                <FileUploader
                  onFileSelect={handleFileSelect}
                  currentFile={selectedFile.name}
                />
              </div>
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

        <Modal
          isOpen={openModalContent}
          onClose={closeModalContent}
          title={`${mode} Content`}
        >
          <form onSubmit={handleSubmitContent}>
            <div className="flex flex-col gap-2 p-5">
              <Input
                name="listMateri"
                label="Content"
                placeholder="Input Content here"
                defaultValue={formContent.listMateri}
                onChange={handleChangeContent}
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
                  setOpenModalContent(false);
                  setFormContent({
                    listMateri: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={openModalTujuan}
          onClose={closeModalTujuan}
          title={`${mode} Tujuan`}
        >
          <form onSubmit={handleSubmitTujuan}>
            <div className="flex flex-col gap-2 p-5">
              <Input
                name="listTujuan"
                label="Tujuan"
                placeholder="Input Tujuan here"
                defaultValue={formTujuan.listTujuan}
                onChange={handleChangeTujuan}
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
                  setOpenModalTujuan(false);
                  setFormTujuan({
                    listTujuan: "",
                  });
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </Modal>

        <Modal
          isOpen={openDeleteModal}
          onClose={closeDeleteModal}
          title={`Delete ${category}`}
        >
          <div className="flex flex-col gap-2 p-5">
            Are you sure want to delete this {category}?
          </div>
          <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
            <button
              type="button"
              className="inline-flex w-full justify-center rounded-md border border-transparent bg-red-500 px-4 py-2 text-base font-medium text-white shadow-sm hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                category == "Title"
                  ? deleteTitle()
                  : category == "Content"
                  ? deleteContent()
                  : deleteTujuan();
              }}
            >
              Yes
            </button>
            <button
              type="button"
              className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={() => {
                setOpenDeleteModal(false);
                setId("");
              }}
            >
              No
            </button>
          </div>
        </Modal>
      </>
    );
  } else {
    navigate("/auth/sign-in");
  }
}

export default Trainings;
