import { useState, useContext } from "react";
import Sidenav from "../component/Sidenav";
import Box from "@mui/material/Box";
import axios from "axios";
import { ProductContext } from "../Context/Store";

const Categories = () => {
  const { getCate, getAllcategory } = useContext(ProductContext);
  const [show, setshow] = useState(false);
  const [id, setid] = useState();
  const [stats, setstats] = useState(0);
  const [update, setupdate] = useState({
  cat_name: "",
  cat_desc: "", 
});
  const [data, setdata] = useState({
    cat_name: "",
    cat_desc: "",
  });
  const handleclick = async (e) => {
    e.preventDefault();
    try {
      let senddata = await axios.post(
        "http://localhost:3000/category/AddCategory",
        data
      );
      if (senddata.status === 200) {
        alert("Category added successfully");
        getAllcategory();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setdata((prev) => {
      return { ...prev, [name]: value };
    });
  };

  const productupdate = (e) => {
    const {name, value} = e.target;
    setupdate((prev) => {
      return { ...prev, [name]: value };
    });
  };
  const handledelete = async (id) => {
    try {
      let deletedata = await axios.put(
        `https://youtube-mern-admin-backend.vercel.app/delete/${id}/status/0`
      );
   
      if (deletedata.status === 200) {
        alert("selected  item  is deleted");
        getAllcategory();
      }
    } catch (error) {
      console.log(error);
    }
  };


  const handleupdate = async (id) => {
    setid(id);
    setshow(!show);
    const data = getCate.find((p) => {
      return p.cat_id == id;
    });
    console.log(data);
    setupdate(data);
   
  };
  const updatecategory = async (e) => {
    e.preventDefault();
    try {
      let updatedata = await axios.patch(
        `https://youtube-mern-admin-backend.vercel.app/category/update/${id}`,
        update
      );
      console.log(id);
      console.log(updatedata);
      getAllcategory();
      alert("successfully updated");
    } catch (error) {
      console.log(error);
    }
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
                    <h2>Add Category</h2>
                    <hr />
                  </div>
                  <div className="card-body">
                    <form>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputEmail1"
                          className="form-label"
                        >
                          Add Category Name
                        </label>
                        <input
                          type="text"
                          name="cat_name"
                          className="form-control"
                          id="exampleInputEmail1"
                          aria-describedby="emailHelp"
                          onChange={handlechange}
                          value={data.cat_name}
                          placeholder="Enter  Category Name"
                        />
                      </div>
                      <div className="mb-3">
                        <label
                          htmlFor="exampleInputPassword1"
                          className="form-label"
                        >
                          Add Category Description
                        </label>
                        <input
                          type="text"
                          name="cat_desc"
                          className="form-control"
                          id="exampleInputPassword1"
                          onChange={handlechange}
                          value={data.cat_desc}
                          placeholder="Enter Category Description"
                        />
                      </div>

                      <button
                        type="submit"
                        onClick={handleclick}
                        className="btn btn-primary"
                      >
                        Add Category
                      </button>
                    </form>
                  </div>
                </div>
              </div>
              <div className="col-lg-9">
                <div className="text-center">
                  <h1>All Category</h1>
                </div>
                <table className="Product_table mt-5">
                  <thead>
                    <tr>
                      <th>Category Name</th>
                      <th>Category Description</th>

                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getCate.map((cate) => {
                      return (
                        <>
                          <tr>
                            <td>{cate.cat_name}</td>
                            <td>{cate.cat_desc}</td>
                            <td className="editdeletebtn">
                              <button
                                className="delete me-2"
                                onClick={() => handledelete(cate.cat_id)}
                              >
                                Delete
                              </button>
                              <button
                                className="update"
                                onClick={() => handleupdate(cate.cat_id)}
                              >
                               
                                Update
                              </button>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              <div className="update_card card mt-lg-5 col-lg-3 pb-3">
                <div className="title text-center mt-3">
                  <h1> Update Category</h1>
                  <hr />
                </div>
                <div className="main_content">
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label"
                      >
                        Category Name
                      </label>
                      <input
                        type="text"
                        name="cat_name"
                        className="form-control"
                        id="exampleInputEmail1"
                        aria-describedby="emailHelp"
                        value={update.cat_name}
                        placeholder="Enter the Category Name"
                        onChange={productupdate}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label
                        htmlFor="exampleInputPassword2"
                        className="form-label"
                      >
                        Category Description
                      </label>
                      <input
                        type="text"
                        name="cat_desc"
                        className="form-control"
                        id="exampleInputPassword2"
                        value={update.cat_desc}
                        onChange={productupdate}
                        placeholder="Enter Category Description"
                        required
                      />
                    </div>

                    <button
                      type="submit"
                      className="btn btn-primary"
                      onClick={updatecategory}
                    >
                      update Category
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

export default Categories;
