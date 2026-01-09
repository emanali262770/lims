import React, { useMemo, useState } from "react";

const RefrenceType = () => {
  const [mode, setMode] = useState("list");

  // filters/search
  const [sortDir, setSortDir] = useState("Asc");
  const [sortBy, setSortBy] = useState("Title");
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");

  // add form
  const [addForm, setAddForm] = useState({ title: "", status: "Active" });
  const [addError, setAddError] = useState("");

  // branch form
  const [branchForm, setBranchForm] = useState({
    userName: "All Reference",
    branch: "Please Select",
  });
  const [branchError, setBranchError] = useState("");

  // demo table data
  const rows = useMemo(
    () => [
      {
        id: 1,
        title: "All Reference",
        status: "Active",
        createdBy: "admin",
        createdDate: "10/4/2021 2:31:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 2,
        title: "Dr. Abdul Jabbar (Physiotherapist)",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "3/21/2025 4:08:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 3,
        title: "Dr. Salman Aslam",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "6/29/2025 5:27:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 4,
        title: "Dr. Waleed",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "3/21/2025 4:01:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 5,
        title: "Dr. Ahsan",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "3/21/2025 4:02:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 6,
        title: "Dr. Ali Shoaib Ashraf",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "3/21/2025 4:05:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 7,
        title: "Dr. Arif Kamal",
        status: "Active",
        createdBy: "Waqar",
        createdDate: "3/21/2025 4:07:00 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = rows.filter((r) => {
      const okStatus = statusFilter === "All" ? true : r.status === statusFilter;
      const okQuery = !q ? true : (r.title || "").toLowerCase().includes(q);
      return okStatus && okQuery;
    });

    out.sort((a, b) => {
      const field = sortBy === "Title" ? "title" : "createdDate";
      const av = (a[field] || "").toString();
      const bv = (b[field] || "").toString();
      const cmp = av.localeCompare(bv);
      return sortDir === "Asc" ? cmp : -cmp;
    });

    return out;
  }, [rows, query, statusFilter, sortBy, sortDir]);

  // ✅ Safe error to string
  const toErrorText = (err) => {
    if (!err) return "";
    if (typeof err === "string") return err;
    if (err instanceof Error) return err.message || "Something went wrong";
    try {
      return JSON.stringify(err);
    } catch {
      return String(err);
    }
  };

  const openAdd = () => {
    setAddError("");
    setAddForm({ title: "", status: "Active" });
    setMode("add");
  };

  const openBranch = (row) => {
    setBranchError("");
    setBranchForm({
      userName: row?.title || "All Reference",
      branch: "Please Select",
    });
    setMode("branch");
  };

  const onSaveAdd = (e) => {
    e.preventDefault();
    try {
      if (!addForm.title.trim()) throw new Error("Fields cannot be blank");
      setAddError("");
      alert("Saved (demo).");
      setMode("list");
    } catch (err) {
      setAddError(toErrorText(err));
    }
  };

  const onSaveBranch = (e) => {
    e.preventDefault();
    try {
      if (!branchForm.branch || branchForm.branch === "Please Select")
        throw new Error("Fields cannot be blank");

      setBranchError("");
      alert("Branch saved (demo).");
      setMode("list");
    } catch (err) {
      setBranchError(toErrorText(err));
    }
  };

  return (
    <div className="p-5">
      {/* LIST MODE */}
      {mode === "list" && (
        <>
          {/* Header (like Users) */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Setup Reference Type</h1>
              <p className="text-sm text-gray-500">
                Manage reference types, status and branch mapping.
              </p>
            </div>

            <button
              onClick={openAdd}
              className="inline-flex items-center gap-2 rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
              type="button"
            >
              + Add
            </button>
          </div>

          {/* Filters Card (like Users) */}
          <div className="rounded-xl border border-gray-200 bg-white p-4 ">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort</label>
                <select
                  value={sortDir}
                  onChange={(e) => setSortDir(e.target.value)}
                  className={filterCls}
                >
                  <option value="Asc">Asc</option>
                  <option value="Desc">Desc</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort By</label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={filterCls}
                >
                  <option value="Title">Title</option>
                  <option value="Created Date">Created Date</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Status</label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={filterCls}
                >
                  <option value="All">All</option>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Search</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={filterCls}
                  placeholder="Name..."
                />
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setSortDir("Asc");
                  setSortBy("Title");
                  setStatusFilter("All");
                  setQuery("");
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Card (like Users) */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white ">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                reference types
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1000px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created by</th>
                    <th className="px-4 py-3">Created date</th>
                    <th className="px-4 py-3">Modified by</th>
                    <th className="px-4 py-3">Modified date</th>
                    <th className="px-4 py-3 text-right">Edit</th>
                    <th className="px-4 py-3 text-right">Add Branches</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.title}</td>

                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                            r.status === "Active"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-700",
                          ].join(" ")}
                        >
                          {r.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-700">{r.createdBy}</td>
                      <td className="px-4 py-3 text-gray-700">{r.createdDate}</td>
                      <td className="px-4 py-3 text-gray-700">{r.modifiedBy || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{r.modifiedDate || "-"}</td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => alert(`Edit (demo): ${r.title}`)}
                        >
                          Edit
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => openBranch(r)}
                        >
                          Add Branches
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-gray-500">
                        No records found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* ADD MODE */}
      {mode === "add" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Setup Reference Type Add Mode</h2>
              {addError ? <p className="text-xs text-red-600 mt-1">{addError}</p> : null}
            </div>

            <button
              type="button"
              onClick={() => setMode("list")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>

          <form onSubmit={onSaveAdd} className="max-w-[520px] space-y-3">
            <FormRow label="Title">
              <input
                value={addForm.title}
                onChange={(e) => setAddForm((p) => ({ ...p, title: e.target.value }))}
                className={[
                  inputCls,
                  addError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                ].join(" ")}
              />
            </FormRow>

            <FormRow label="Status">
              <select
                value={addForm.status}
                onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value }))}
                className={inputCls}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </FormRow>

            <div className="pt-2 flex items-center gap-2">
              <button
                type="submit"
                className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
              >
                Save
              </button>
              <button
                type="button"
                onClick={() => setMode("list")}
                className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* ADD BRANCHES MODE */}
      {mode === "branch" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Privileges Add/Edit Mode</h2>
              {branchError ? <p className="text-xs text-red-600 mt-1">{branchError}</p> : null}
            </div>

            <button
              type="button"
              onClick={() => setMode("list")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>

          <form onSubmit={onSaveBranch}>
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[520px_1fr]">
              {/* Left (fields like Users form layout) */}
              <div className="space-y-3">
                <FormRow label="User Name">
                  <input value={branchForm.userName} readOnly className={inputCls} />
                </FormRow>

                <FormRow label="Branch">
                  <select
                    value={branchForm.branch}
                    onChange={(e) => setBranchForm((p) => ({ ...p, branch: e.target.value }))}
                    className={[
                      inputCls,
                      branchError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                    ].join(" ")}
                  >
                    <option>Please Select</option>
                    <option>Rabia Welfare Hospital</option>
                    <option>Head Office (RWH)</option>
                    <option>Branch 03</option>
                  </select>
                </FormRow>
              </div>

              {/* Right (table + check all) */}
              <div className="space-y-2">
                <div className="text-xs font-semibold text-gray-600">Please select References:</div>

                <div className="flex flex-wrap items-start gap-6">
                  <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                    <div className="overflow-x-auto">
                      <table className="min-w-[360px] w-full text-sm">
                        <thead className="bg-gray-50">
                          <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                            <th className="px-4 py-3">Company Name</th>
                            <th className="px-4 py-3 text-center">Add</th>
                          </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">
                          {[
                            { id: 1, name: "Head Office(RWH)" },
                            { id: 2, name: "Rabia Welfare Hospital" },
                          ].map((c) => (
                            <tr key={c.id} className="hover:bg-gray-50">
                              <td className="px-4 py-3 text-gray-700">{c.name}</td>
                              <td className="px-4 py-3 text-center">
                                <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" defaultChecked />
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <label className="mt-3 flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />
                    <span className="text-sm">Check All</span>
                  </label>
                </div>
              </div>
            </div>

            {/* Bottom controls (like Users form buttons) */}
            <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-[520px_1fr]">
              <div className="space-y-3">
                <FormRow label="Status">
                  <select value={"Active"} onChange={() => {}} className={inputCls}>
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                </FormRow>

                <div className="pt-2 flex items-center gap-2">
                  <button
                    type="submit"
                    className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setMode("list")}
                    className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
                  >
                    Cancel
                  </button>
                </div>
              </div>

              <div />
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default RefrenceType;

/* ------------------------ Styling helpers (same as Users) ------------------------ */

const FormRow = ({ label, children }) => (
  <div className="grid grid-cols-[170px_1fr] items-center gap-3">
    <label className="text-xs font-semibold text-gray-700 text-right">{label}:</label>
    {children}
  </div>
);

const filterCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20";

const inputCls =
  "h-[26px] w-full rounded border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20";
