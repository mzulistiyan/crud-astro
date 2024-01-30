//import useState
import { useState } from "react";

//import API
import api from "../services/api";

export default function PostCreate() {
  //define state
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  //state validation
  const [errors, setErrors] = useState([]);



  //method store post
  const storePost = async (e) => {
    e.preventDefault();

    //init FormData
    const formData = new FormData();

    //append data
    formData.append("data", JSON.stringify({
        nama: title,
        jabatan: content
      }));
      const token = 'dcd2440367e0792f65a888dfd21a27c0f1526a5c2c73121367aa9920e6dd121ec5d88f736ab33f064f7bd7154983ccce4ec54c55dbf59311fc968d62e9d507b4325efb97cd05c3dcc36c24e9037ecef87888b1b80250263f845314fadf1a95f14cd1385bb425e52b4bb8c699702983f938401df29b47984ffd74de8678879413';

    //send data with API
    await api
      .post("/api/pejabat-dinas-puprs", formData, {
        headers: {
          // inform the server about the form-data
          'Content-Type': 'multipart/form-data',
          // Add the Authorization header with the token
          'Authorization': `Bearer ${token}`
        }
      })
      .then(() => {
        //redirect to posts index
        window.location.href = "/";
      })
      .catch((error) => {
        //set errors response to state "errors"
        setErrors(error.response.data);
      });
  };

  

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-12">
          <div className="card border-0 rounded shadow">
            <div className="card-body">
              <form onSubmit={storePost}>


                <div className="mb-3">
                  <label className="form-label fw-bold">Nama</label>
                  <input
                    type="text"
                    className="form-control"
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Title Post"
                  />
                  {errors.title && (
                    <div className="alert alert-danger mt-2">
                      {errors.title[0]}
                    </div>
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label fw-bold">Jabatan</label>
                  <textarea
                    className="form-control"
                    onChange={(e) => setContent(e.target.value)}
                    rows="5"
                    placeholder="Content Post"
                  ></textarea>
                  {errors.content && (
                    <div className="alert alert-danger mt-2">
                      {errors.content[0]}
                    </div>
                  )}
                </div>

                <button
                  type="submit"
                  className="btn btn-md btn-primary rounded-sm shadow border-0"
                >
                  Save
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}