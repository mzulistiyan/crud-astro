//import useState dan useEffect
import { useState, useEffect } from "react";

//import api
import api from "../services/api";

export default function PostIndex() {
  //ini state
  const [posts, setPosts] = useState([]);

  //define method "fetchDataPosts"
  const fetchDataPosts = async () => {
    //fetch data from API with Axios
    await api.get("/api/pejabat-dinas-puprs").then((response) => {
      //assign response data to state "posts"
      console.log(response.data.data.data);
      setPosts(response.data.data);
    });
    //print response data to console
    console.log(posts);
  };

  //run hook useEffect
  useEffect(() => {
    //call method "fetchDataPosts"
    fetchDataPosts();
  }, []);
    //method deletePost
    const token = 'dcd2440367e0792f65a888dfd21a27c0f1526a5c2c73121367aa9920e6dd121ec5d88f736ab33f064f7bd7154983ccce4ec54c55dbf59311fc968d62e9d507b4325efb97cd05c3dcc36c24e9037ecef87888b1b80250263f845314fadf1a95f14cd1385bb425e52b4bb8c699702983f938401df29b47984ffd74de8678879413';

    const deletePost = async (id) => {
        //delete with api
        await api.delete(`/api/pejabat-dinas-puprs/${id}`,{
            headers: {
                // inform the server about the form-data
                'Content-Type': 'multipart/form-data',
                // Add the Authorization header with the token
                'Authorization': `Bearer ${token}`
              }
        }).then(() => {
          //call method "fetchDataPosts"
          fetchDataPosts();
        });
      };

  return (
    <table className="table table-bordered">
      <thead className="bg-dark text-white">
        <tr>
          <th scope="col">Nama</th>
          <th scope="col">Jabatan</th>
          <th scope="col" style={{ width: "15%" }}>
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {posts.length > 0 ? (
          posts.map((post, index) => (
            <tr key={index}>
              <td>{post.attributes.nama}</td>
              <td>{post.attributes.jabatan}</td>
              <td className="text-center">
                <a
                  href={`/posts/edit/${post.id}`}
                  className="btn btn-sm btn-primary rounded-sm shadow border-0 me-2"
                >
                  EDIT
                </a>
                <button
                  onClick={() => deletePost(post.id)}
                  className="btn btn-sm btn-danger rounded-sm shadow border-0"
                >
                  DELETE
                </button>
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="4" className="text-center">
              <div className="alert alert-danger mb-0">
                Data Belum Tersedia!
              </div>
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}