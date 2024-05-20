import { useState, useContext } from "react";
import Sidenav from "../component/Sidenav";
import Box from "@mui/material/Box";
import axios from "axios";
import { ProductContext } from "../Context/Store";

const Videos = () => {
  const { getproduct, getAllProduct, getSortProduct, getCate } =
    useContext(ProductContext);
  const [proid, setproid] = useState();

  let username = localStorage.getItem("name");
  let id = localStorage.getItem("uid");

  const[stats,setstat] = useState(0);
  const [show, setShow] = useState(false);
  const [data, setdata] = useState({
    p_name: "",
    url: "",
    p_desc: "",
    cat_name: "",
    type: "",
    p_image: "",
  });
  const [update, setupdate] = useState({
    p_name: "",
    url: "",
    p_desc: "",
    cat_name: "",
    type: "",
    p_image: "",
  });
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handleclick = async (e) => {
    e.preventDefault();
    try {
      let senddata = await axios.post(
        `https://mern-backend-eosin.vercel.app/product/AddNewProduct/${id}`,
        data
      );
      if (senddata.status === 200) {
        alert("Video added Successfully");
        getAllProduct();
      } else if (senddata.status === 400) {
        alert("Failed to added Video");
      }
    } catch (error) {
      console.log(error);
    }
    setdata({
      p_name: "",
    url: "",
    p_desc: "",
    cat_name: "",
    type: "",
    p_image: "",
    });
    getAllProduct();
  };

  const softdelete = (id) => {
    handledelete(id);
  };

  const handledelete = async (id) => {
    try {
      let deletedata = await axios.put(
        `https://mern-backend-eosin.vercel.app/product/softdelete/${id}/status/${stats}`
      );
      if (deletedata.status === 200) {
        alert("successfully delete");

        getAllProduct();
      } else if (deletedata.status === 400) {
        alert("Not deleted");
      }
    } catch (error) {
      console.log(error);
    }
  };


  const showhandleupdate = (id) => {
    setShow(!show);

    console.log(id);
    let item = getproduct.find((product) =>
      product.data.find((info) => info.p_id === id)
    );
    let data = item ? item.data.find((info) => info.p_id === id) : null;
    setproid(id);
    setupdate(data);
    console.log(data);

    //   setproid(id);
  };
  const handleupdatechange = (e) => {
    const { name, value } = e.target;
    setupdate((prev) => {
      return { ...prev, [name]: value };
    });
    console.log(name);
  };
  const handleupdate = async (e) => {
    e.preventDefault();

    try {
      let updatedata = await axios.patch(
        `https://mern-backend-eosin.vercel.app/product/Update/${proid}`,
        update
      );
      console.log(proid);
      console.log(updatedata);

      getAllProduct();
    } catch (error) {
      console.log(error);
    }
    setupdate({
      p_name: "",
      url: "",
      p_desc: "",
      cat_name: "",
      type: "",
      p_image: "",
    });
  };
  const handlesorting = async (e) => {
    const { value } = e.target;
    getSortProduct(value);
  };

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <Sidenav></Sidenav>

        <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
          <div className="container-fluid mt-5 pt-5">
            <div className="row">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-title text-center mt-2">
                    <h2>Add Videos</h2>
                    <hr />
                  </div>
                  <div className="card-body">
                    <form>
                      <select
                        className="form-select mb-3"
                        name="cat_name"
                        aria-label="Default select example"
                        onChange={handlechange}
                      >
                        <option selected>Select Category</option>
                        {getCate.map((cat) => {
                          return (
                            <>
                              <option value={cat.value}>{cat.cat_name}</option>
                            </>
                          );
                        })}

                      
                      </select>
                      <select
                        className="form-select mb-3"
                        name="type"
                        aria-label="Default select example"
                        onChange={handlechange}
                      >
                        <option selected>Select Type</option>
                        <option value="vrt">Vertical</option>
                        <option value="hrz">Horizontal</option>
                      </select>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Video Title
                        </label>
                        <input
                          type="text"
                          name="p_name"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={handlechange}
                          value={data.ProductName}
                          placeholder="Enter the video Title"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Add Url of the Video
                        </label>
                        <input
                          type="text"
                          name="url"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handlechange}
                          value={data.url}
                          placeholder="Enter the Url of the Video"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Add Product Image Url
                        </label>
                        <input
                          type="text"
                          name="p_image"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handlechange}
                          value={data.p_image}
                          placeholder="Enter the Url of the Video"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword2"
                          className="form-label"
                        >
                          Add Video Description
                        </label>
                        <input
                          type="text"
                          name="p_desc"
                          className="form-control"
                          id="exampleInputPassword2"
                          onChange={handlechange}
                          value={data.p_desc}
                          placeholder="Enter the Description of the video"
                          required
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={handleclick}
                        className="btn btn-primary"
                      >
                        Add Video
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="text-center">
                  <div className="d-flex justify-content-between">
                    <h1>All products </h1>
                    <div>
                      <select
                        className="form-select"
                        aria-label="Default select example"
                        onChange={handlesorting}
                      >
                        <option selected>Sort</option>
                        <option value="p_name">A - Z </option>
                        <option value="-p_name">Z - A</option>
                      </select>
                    </div>
                  </div>
                </div>
                <table className="Product_table mt-5">
                  <thead>
                    <tr>
                      <th>UserName</th>
                      <th>Category Name</th>
                      <th>Video Title</th>
                      <th>Video Description</th>
                      <th>Video Url</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getproduct.map((items) => {
                      return items.data.map((info) => {
                        return (
                          <>
                            <tr key={info.p_id}>
                              <td>{username}</td>
                              <td>{info.cat_name}</td>
                              <td>{info.p_name}</td>
                              <td>{info.p_desc}</td>
                              <td>{info.url}</td>

                              <td className="editdeletebtn">
                                <button
                                  className="delete"
                                  onClick={() => softdelete(info.p_id)}
                                >
                                  Delete
                                </button>{" "}
                                <button
                                  className="update"
                                  onClick={() => showhandleupdate(info.p_id)}
                                >
                                  Update
                                </button>
                              </td>
                            </tr>
                          </>
                        );
                      });
                    })}
                  
                  </tbody>
                </table>
              </div>
              <div className="update_card card mt-lg-5 col-lg-3">
                <div className="title">
                  <h1> Update Product</h1>
                </div>
                <div className="main_content">
                  <form>
                    <select
                      className="form-select mb-3"
                      name="category"
                      aria-label="Default select example"
                      onChange={handleupdatechange}
                    >
                      <option selected>Select Category</option>
                      {getCate.map((cat) => {
                        return (
                          <>
                            <option value={cat.value}>{cat.cat_name}</option>
                          </>
                        );
                      })}
                    </select>

                    <select
                      className="form-select mb-3"
                      name="Type"
                      aria-label="Default select example"
                      onChange={handleupdatechange}
                    >
                      <option selected>Select Type</option>
                      <option value="vrt">Vertical</option>
                      <option value="hrz">Horizontal</option>
                    </select>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Video Title
                      </label>
                      <input
                        type="text"
                        name="p_name"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        onChange={handleupdatechange}
                        value={update.p_name}
                        placeholder="Enter the video Title"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword1"
                        className="form-label"
                      >
                        Add Url of the Video
                      </label>
                      <input
                        type="text"
                        name="url"
                        className="form-control"
                        id="exampleInputPassword1"
                        onChange={handleupdatechange}
                        value={update.url}
                        placeholder="Enter the Url of the Video"
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword2"
                        className="form-label"
                      >
                        Add Video Description
                      </label>
                      <input
                        type="text"
                        name="p_desc"
                        className="form-control"
                        id="exampleInputPassword2"
                        onChange={handleupdatechange}
                        value={update.p_desc}
                        placeholder="Enter the Description of the video"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      onClick={handleupdate}
                      className="btn btn-primary"
                    >
                      update video
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </Box>
      </Box>
    </>
  );
};

export default Videos;
