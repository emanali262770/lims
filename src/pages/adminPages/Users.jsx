import React, { useMemo, useState } from "react";

const Users = () => {
  const [filters, setFilters] = useState({
    role: "",
    status: "",
    createdBy: "",
    query: "",
  });

  const [isAddMode, setIsAddMode] = useState(false);

  const data = useMemo(
    () => [
      {
        name: "Sameed Younis",
        email: "123",
        userName: "sameed",
        roleName: "Receptionist",
        createdBy: "MAZHAR",
        createdDate: "11-03-2025 12:34 PM",
        modifiedBy: "",
        modifiedDate: "",
        status: "Active",
      },
      {
        name: "Rimsha Tariq",
        email: "no",
        userName: "rimsha",
        roleName: "Receptionist",
        createdBy: "MAZHAR",
        createdDate: "15-03-2025 11:42 AM",
        modifiedBy: "",
        modifiedDate: "",
        status: "Active",
      },
      {
        name: "Abdul Rehman",
        email: "123",
        userName: "rehman",
        roleName: "Receptionist",
        createdBy: "MAZHAR",
        createdDate: "18-03-2025 10:03 AM",
        modifiedBy: "",
        modifiedDate: "",
        status: "Active",
      },
      {
        name: "Mazhar Ahmad",
        email: "kmazhar357@gmail.com",
        userName: "MAZHAR",
        roleName: "Admin",
        createdBy: "Waqar",
        createdDate: "11-03-2025 12:23 PM",
        modifiedBy: "",
        modifiedDate: "",
        status: "Active",
      },
      {
        name: "Iqra Munir",
        email: "iqra123@gmail.com",
        userName: "iqra",
        roleName: "Account Office",
        createdBy: "MAZHAR",
        createdDate: "14-04-2025 09:47 AM",
        modifiedBy: "",
        modifiedDate: "",
        status: "Active",
      },
    ],
    []
  );

  const roles = useMemo(() => Array.from(new Set(data.map((d) => d.roleName))), [data]);
  const creators = useMemo(
    () => Array.from(new Set(data.map((d) => d.createdBy))).filter(Boolean),
    [data]
  );

  const filtered = useMemo(() => {
    return data.filter((row) => {
      const roleOk = !filters.role || row.roleName === filters.role;
      const statusOk = !filters.status || row.status === filters.status;
      const createdByOk = !filters.createdBy || row.createdBy === filters.createdBy;
      const q = filters.query.trim().toLowerCase();
      const qOk =
        !q ||
        row.name.toLowerCase().includes(q) ||
        row.userName.toLowerCase().includes(q) ||
        row.email.toLowerCase().includes(q);

      return roleOk && statusOk && createdByOk && qOk;
    });
  }, [data, filters]);

  return (
    <div className="p-5">
      {!isAddMode ? (
        <>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Users</h1>
              <p className="text-sm text-gray-500">
                Manage user accounts, roles and status.
              </p>
            </div>

            <button
              onClick={() => setIsAddMode(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
            >
              + Add User
            </button>
          </div>

          {/* Filters Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Role
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                  value={filters.role}
                  onChange={(e) => setFilters((p) => ({ ...p, role: e.target.value }))}
                >
                  <option value="">All roles</option>
                  {roles.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Status
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                  value={filters.status}
                  onChange={(e) => setFilters((p) => ({ ...p, status: e.target.value }))}
                >
                  <option value="">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Created by
                </label>
                <select
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                  value={filters.createdBy}
                  onChange={(e) =>
                    setFilters((p) => ({ ...p, createdBy: e.target.value }))
                  }
                >
                  <option value="">Anyone</option>
                  {creators.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Search
                </label>
                <input
                  className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                  placeholder="Name, username, email..."
                  value={filters.query}
                  onChange={(e) => setFilters((p) => ({ ...p, query: e.target.value }))}
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:brightness-95">
                Search
              </button>

              <button
                onClick={() =>
                  setFilters({
                    role: "",
                    status: "",
                    createdBy: "",
                    query: "",
                  })
                }
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                users
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Email</th>
                    <th className="px-4 py-3">Username</th>
                    <th className="px-4 py-3">Role</th>
                    <th className="px-4 py-3">Created by</th>
                    <th className="px-4 py-3">Created date</th>
                    <th className="px-4 py-3">Modified by</th>
                    <th className="px-4 py-3">Modified date</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3 text-right">Action</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((row, idx) => (
                    <tr key={idx} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">
                        {row.name}
                      </td>
                      <td className="px-4 py-3 text-gray-700">{row.email}</td>
                      <td className="px-4 py-3 text-gray-700">{row.userName}</td>
                      <td className="px-4 py-3 text-gray-700">{row.roleName}</td>
                      <td className="px-4 py-3 text-gray-700">{row.createdBy}</td>
                      <td className="px-4 py-3 text-gray-700">{row.createdDate}</td>
                      <td className="px-4 py-3 text-gray-700">
                        {row.modifiedBy || "-"}
                      </td>
                      <td className="px-4 py-3 text-gray-700">
                        {row.modifiedDate || "-"}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-semibold text-green-700">
                          {row.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <AddUserForm
          onCancel={() => setIsAddMode(false)}
          onSave={() => {
            // ✅ call your API here
            setIsAddMode(false); // go back to table after save
          }}
        />
      )}
    </div>
  );
};

export default Users;

/* ----------------------- ADD USER FORM ----------------------- */

const AddUserForm = ({ onCancel, onSave }) => {
  const [form, setForm] = useState({
    title: "Mr",
    firstName: "",
    email: "",
    contactNo: "",
    userName: "",
    password: "",
    role: "",
    branch: "",
    referenceCompany: "",
    defaultRegCompany: "",
    centers: "",
    defaultModule: "Lab",
    sampleLocation: "",
    userType: "Normal",
    referenceType: "",
    onlineAccess: "No",
    status: "Active",
  });

  const set = (k) => (e) => setForm((p) => ({ ...p, [k]: e.target.value }));

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            User Registration Add Mode
          </h2>
          <p className="text-xs text-red-600 mt-1">* Fields cannot be blank</p>
        </div>

        <button
          onClick={onCancel}
          className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Back
        </button>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-[1fr_360px]">
        {/* Left form */}
        <div className="mx-auto w-full max-w-[520px]">
          <div className="space-y-2">
            <Row label="Title">
              <select className={inputCls} value={form.title} onChange={set("title")}>
                <option>Mr</option>
                <option>Ms</option>
                <option>Mrs</option>
              </select>
            </Row>

            <Row label="First Name">
              <input className={inputCls} value={form.firstName} onChange={set("firstName")} />
            </Row>

            <Row label="Email">
              <input className={inputCls} value={form.email} onChange={set("email")} />
            </Row>

            <Row label="Contact No">
              <input className={inputCls} value={form.contactNo} onChange={set("contactNo")} />
            </Row>

            <Row label="User Name">
              <input className={inputCls} value={form.userName} onChange={set("userName")} />
            </Row>

            <Row label="Password">
              <input
                type="password"
                className={inputCls}
                value={form.password}
                onChange={set("password")}
              />
            </Row>

            <Row label="Role">
              <select className={inputCls} value={form.role} onChange={set("role")}>
                <option value="">Please Select</option>
                <option>Admin</option>
                <option>Receptionist</option>
              </select>
            </Row>

            <Row label="Branch">
              <select className={inputCls} value={form.branch} onChange={set("branch")}>
                <option value="">Please Select</option>
                <option>Main</option>
                <option>Branch 2</option>
              </select>
            </Row>

            <Row label="Reference/Company">
              <input
                className={inputCls}
                value={form.referenceCompany}
                onChange={set("referenceCompany")}
              />
            </Row>

            <Row label="Default Registration Company">
              <input
                className={inputCls}
                value={form.defaultRegCompany}
                onChange={set("defaultRegCompany")}
              />
            </Row>

            <Row label="Centers">
              <select className={inputCls} value={form.centers} onChange={set("centers")}>
                <option value="">Please Select</option>
                <option>Center 1</option>
                <option>Center 2</option>
              </select>
            </Row>

            <Row label="Default Module">
              <select className={inputCls} value={form.defaultModule} onChange={set("defaultModule")}>
                <option>Lab</option>
                <option>Reception</option>
              </select>
            </Row>

            <Row label="Sample Location">
              <select className={inputCls} value={form.sampleLocation} onChange={set("sampleLocation")}>
                <option value="">Please Select</option>
                <option>Location 1</option>
                <option>Location 2</option>
              </select>
            </Row>

            <Row label="User Type">
              <select className={inputCls} value={form.userType} onChange={set("userType")}>
                <option>Normal</option>
                <option>Admin</option>
              </select>
            </Row>

            <Row label="Reference Type">
              <input className={inputCls} value={form.referenceType} onChange={set("referenceType")} />
            </Row>

            <Row label="Online Access">
              <select className={inputCls} value={form.onlineAccess} onChange={set("onlineAccess")}>
                <option>No</option>
                <option>Yes</option>
              </select>
            </Row>

            <Row label="Status">
              <select className={inputCls} value={form.status} onChange={set("status")}>
                <option>Active</option>
                <option>Inactive</option>
              </select>
            </Row>

            <div className="pt-2 flex items-center justify-center gap-2">
              <button
                onClick={onSave}
                className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
              >
                Save
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>

      
      </div>
    </div>
  );
};

const Row = ({ label, children }) => (
  <div className="grid grid-cols-[170px_1fr] items-center gap-3">
    <label className="text-xs font-semibold text-gray-700 text-right">{label}:</label>
    {children}
  </div>
);

const inputCls =
  "h-[26px] w-full rounded border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20";
