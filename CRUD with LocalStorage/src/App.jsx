import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  const defaultData = [
    { id: 1, firstName: "Sujan", lastName: "Patel", GrId: 3214, age: 22, Course: "Fullstack" },
    { id: 2, firstName: "Manasvi", lastName: "Jethavat", GrId: 8865, age: 17, Course: "Fullstack" },
    { id: 3, firstName: "Meet", lastName: "Patel", GrId: 8809, age: 23 , Course: "Fullstack"}
  ];

  const [data, setData] = useState([]);
  const [updateMode, setUpdateMode] = useState(false);
  const [form, setForm] = useState({ id: null, firstName: "", lastName: "", GrId: "", age: "", Course: "" });

  // Load data from localStorage or use default
  useEffect(() => {
    const stored = localStorage.getItem("Students");
    if (stored) {
      setData(JSON.parse(stored));
    } else {
      setData(defaultData);
      localStorage.setItem("Students", JSON.stringify(defaultData));
    }
  }, []);

  // Save to localStorage
  const saveToLocal = (newData) => {
    setData(newData);
    localStorage.setItem("Students", JSON.stringify(newData));
  };

  // Handle add or update
  const handleSubmit = () => {
    const formattedForm = {
      ...form,
      GrId: Number(form.GrId),
      age: Number(form.age),
    };

    if (updateMode) {
      const updated = data.map((item) =>
        item.id === form.id ? { ...formattedForm } : item
      );
      saveToLocal(updated);
    } else {
      const newItem = {
        ...formattedForm,
        id: data.length > 0 ? data[data.length - 1].id + 1 : 1
      };
      saveToLocal([...data, newItem]);
    }

    setForm({ id: null, firstName: "", lastName: "", GrId: "", age: "",Course: "" });
    setUpdateMode(false);
  };

  const handleEdit = (item) => {
    setForm(item);
    setUpdateMode(true);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      const filtered = data.filter((item) => item.id !== id);
      saveToLocal(filtered);
    }
  };

  const handleClear = () => {
    setForm({ id: null, firstName: "", lastName: "", GrId: "", age: "", Course: "" });
    setUpdateMode(false);
  };

  return (
    <div className="container mt-4" style= {{ fontFamily: 'Poppins, sans-serif' }}>
      <h3 className="text-center text-danger mb-3">Red And White Students List</h3>

      <div className="row mb-3">
        <div className="col">
          <input
            className="form-control"
            placeholder="First Name"
            value={form.firstName}
            onChange={(e) => setForm({ ...form, firstName: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            placeholder="Last Name"
            value={form.lastName}
            onChange={(e) => setForm({ ...form, lastName: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="GrId"
            value={form.GrId}
            onChange={(e) => setForm({ ...form, GrId: e.target.value })}
          />
        </div>
        <div className="col">
          <input
            className="form-control"
            type="number"
            placeholder="Age"
            value={form.age}
            onChange={(e) => setForm({ ...form, age: e.target.value })}
          />
        </div>
         <div className="col">
          <input
            className="form-control"
            placeholder="Course-Name"
            value={form.Course}
            onChange={(e) => setForm({ ...form, Course: e.target.value })}
          />
        </div>
        <div className="col d-flex gap-2">
          <button className="btn btn-success" onClick={handleSubmit}>
            {updateMode ? "Update" : "Add"}
          </button>
          <button className="btn btn-secondary" onClick={handleClear}>
            Clear
          </button>
        </div>
      </div>

      <table className="table table-bordered text-center">
        <thead className="table-danger">
          <tr>
            <th>ID</th>
            <th>First</th>
            <th>Last</th>
            <th>GrId</th>
            <th>Age</th>
            <th>Course</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((emp) => (
            <tr key={emp.id}>
              <td>{emp.id}</td>
              <td>{emp.firstName}</td>
              <td>{emp.lastName}</td>
              <td>{emp.GrId}</td>
              <td>{emp.age}</td>
              <td>{emp.Course}</td>
              <td>
                <button className="btn fs-5 me-2  p-2 btn-info h-100 w-0" onClick={() => handleEdit(emp)}>
                  🖊️
                </button>
                <button className="btn fs-5 p-2 btn-dark h-100 w-0" onClick={() => handleDelete(emp.id)}>
                  🗑️
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default App;
