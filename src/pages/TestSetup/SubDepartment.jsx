import React, { useMemo, useState } from "react";

const SubDepartment = () => {
  
  const [mode, setMode] = useState("list");

  // LIST filters (same styling pattern as your ReferenceType)
  const [sortDir, setSortDir] = useState("Asc");
  const [sortBy, setSortBy] = useState("Name");
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");

  // selection for transfer screen
  const [activeDept, setActiveDept] = useState(null);

  // ADD form
  const [addForm, setAddForm] = useState({ name: "", status: "Active" });
  const [addError, setAddError] = useState("");

  // transfer screen state (demo)
  const [transferDeptSelect, setTransferDeptSelect] = useState(
    "Department of Advanced Chemical Pathology"
  );
  const [selectAllTests, setSelectAllTests] = useState(false);
  const [sortOrders, setSortOrders] = useState({}); // { testCode: "0" }

  const departments = useMemo(
    () => [
      {
        id: 1,
        name: "BETA HCG",
        status: "InActive",
        createdBy: "wadoods",
        createdDate: "25/07/2014 03:42 PM",
        modifiedBy: "mahmad",
        modifiedDate: "17/03/2023 10:11 AM",
      },
      {
        id: 2,
        name: "Bio-Chemistry",
        status: "InActive",
        createdBy: "admin",
        createdDate: "17/05/2014 02:43 PM",
        modifiedBy: "mahmad",
        modifiedDate: "17/03/2023 10:11 AM",
      },
      {
        id: 3,
        name: "Cardiology",
        status: "InActive",
        createdBy: "admin",
        createdDate: "08/11/2017 08:58 AM",
        modifiedBy: "admin",
        modifiedDate: "08/11/2017 09:06 AM",
      },
      {
        id: 4,
        name: "CBC Department",
        status: "Active",
        createdBy: "admin",
        createdDate: "27/05/2014 08:55 PM",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 5,
        name: "Daily Work Sheet",
        status: "InActive",
        createdBy: "tufail",
        createdDate: "27/05/2014 08:16 PM",
        modifiedBy: "admin",
        modifiedDate: "05/09/2020 04:05 PM",
      },
      {
        id: 6,
        name: "ELISA BACTERIAL MARKERS",
        status: "InActive",
        createdBy: "tufail",
        createdDate: "27/05/2014 07:46 PM",
        modifiedBy: "mehboob",
        modifiedDate: "09/06/2014 10:10 PM",
      },
    ],
    []
  );

  const availableTests = useMemo(
    () => [
      { code: "2573", name: "17-Hydroxy Progesterone (OHP)", department: "Special Chemistry" },
      { code: "1117", name: "24 Hrs Urinary Metanephrine", department: "Special Chemistry" },
      { code: "1119", name: "24 Hrs Urinary Normetanephrine", department: "Special Chemistry" },
      { code: "5050", name: "25Hydroxy Vitamin - D", department: "Special Chemistry" },
      { code: "2705", name: "Acid Phosphatase Total", department: "Special Chemistry" },
      { code: "4119", name: "ACTH (Adrenocorticotrophic Hormone)", department: "Special Chemistry" },
      { code: "4171", name: "Aldosterone Level (Serum)", department: "Special Chemistry" },
      { code: "3555", name: "Aldosterone/Direct Renin Ratio", department: "Special Chemistry" },
      
    ],
    []
  );

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = departments.filter((d) => {
      const okStatus = statusFilter === "All" ? true : d.status === statusFilter;
      const okQuery = !q ? true : (d.name || "").toLowerCase().includes(q);
      return okStatus && okQuery;
    });

    out.sort((a, b) => {
      const field = sortBy === "Name" ? "name" : "createdDate";
      const av = (a[field] || "").toString();
      const bv = (b[field] || "").toString();
      const cmp = av.localeCompare(bv);
      return sortDir === "Asc" ? cmp : -cmp;
    });

    return out;
  }, [departments, query, statusFilter, sortBy, sortDir]);

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

  const resetFilters = () => {
    setSortDir("Asc");
    setSortBy("Name");
    setStatusFilter("All");
    setQuery("");
  };

  const openTransfer = (dept) => {
    setActiveDept(dept);
    setMode("transfer");
    setSelectAllTests(false);
    setSortOrders({});
  };

  const openAdd = () => {
    setAddError("");
    setAddForm({ name: "", status: "Active" });
    setMode("add");
  };

  const onSaveAdd = (e) => {
    e.preventDefault();
    try {
      if (!addForm.name.trim()) throw new Error("Fields cannot be blank");
      setAddError("");
      alert("Saved (demo).");
      setMode("list");
    } catch (err) {
      setAddError(toErrorText(err));
    }
  };

  const toggleAll = (checked) => {
    setSelectAllTests(checked);
    // (demo only) – in real app you'd store selected ids
  };

  const setOrder = (code) => (e) => {
    setSortOrders((p) => ({ ...p, [code]: e.target.value }));
  };

  return (
    <div className="p-5">
      {/* LIST MODE */}
      {mode === "list" && (
        <>
          {/* Header */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Setup Sub Department</h1>
              <p className="text-sm text-gray-500">
                Manage departments, status and test transfer.
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

          {/* Filters Card */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort</label>
                <select value={sortDir} onChange={(e) => setSortDir(e.target.value)} className={filterCls}>
                  <option value="Asc">Asc</option>
                  <option value="Desc">Desc</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort By</label>
                <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className={filterCls}>
                  <option value="Name">Name</option>
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
                  <option value="InActive">InActive</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Search</label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={filterCls}
                  placeholder="Department name..."
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
                onClick={resetFilters}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Card */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> departments
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created by</th>
                    <th className="px-4 py-3">Created date</th>
                    <th className="px-4 py-3">Modified by</th>
                    <th className="px-4 py-3">Modified date</th>
                    <th className="px-4 py-3 text-right">Edit</th>
                    <th className="px-4 py-3 text-right">Test Transfer</th>
                    <th className="px-4 py-3 text-right">History</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((d) => (
                    <tr key={d.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{d.name}</td>

                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                            d.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700",
                          ].join(" ")}
                        >
                          {d.status}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-gray-700">{d.createdBy || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{d.createdDate || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{d.modifiedBy || "-"}</td>
                      <td className="px-4 py-3 text-gray-700">{d.modifiedDate || "-"}</td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className={actionBtnCls}
                          onClick={() => alert(`Edit (demo): ${d.name}`)}
                        >
                          Edit
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button type="button" className={actionBtnCls} onClick={() => openTransfer(d)}>
                          Test Transfer
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className={actionBtnCls}
                          onClick={() => alert(`Show Edit History (demo): ${d.name}`)}
                        >
                          Show Edit History
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
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

      {/* TRANSFER MODE */}
      {mode === "transfer" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Test Transfer</h2>
              <p className="text-sm text-gray-500">
                Department Name: <span className="font-semibold text-gray-900">{activeDept?.name || "-"}</span>
              </p>
              <p className="text-xs text-gray-500">Sub department test (demo)</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setMode("list")}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Back
              </button>
            </div>
          </div>

          <div className="mb-3 flex flex-wrap items-center gap-2">
            <button type="button" className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Transfer to Sub department
            </button>
            <button type="button" onClick={() => setMode("list")} className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50">
              Back To Sub Department
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1fr_360px]">
            {/* LEFT: Available Tests */}
            <div>
              <div className="mb-2 text-sm font-semibold text-gray-900">Available Tests</div>

              <div className="mb-2 flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm text-gray-700">
                  <input
                    type="checkbox"
                    className="h-3.5 w-3.5 rounded border-gray-300"
                    checked={selectAllTests}
                    onChange={(e) => toggleAll(e.target.checked)}
                  />
                  <span>Select all</span>
                </label>

                <select
                  className="h-[30px] rounded-lg border border-gray-300 bg-white px-3 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                  value={transferDeptSelect}
                  onChange={(e) => setTransferDeptSelect(e.target.value)}
                >
                  <option>Department of Advanced Chemical Pathology</option>
                  <option>Department of Hematology</option>
                  <option>Department of Microbiology</option>
                </select>
              </div>

              <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                <div className="overflow-x-auto">
                  <table className="min-w-[760px] w-full text-sm">
                    <thead className="bg-gray-50">
                      <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                        <th className="px-4 py-3 w-[90px]">Test Code</th>
                        <th className="px-4 py-3">Test Name</th>
                        <th className="px-4 py-3 w-[160px]">Department</th>
                        <th className="px-4 py-3 w-[140px]">Sort Order</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">
                      {availableTests.map((t) => (
                        <tr key={t.code} className="hover:bg-gray-50">
                          <td className="px-4 py-2 text-gray-700">{t.code}</td>
                          <td className="px-4 py-2 text-gray-700">{t.name}</td>
                          <td className="px-4 py-2 text-gray-700">{t.department}</td>
                          <td className="px-4 py-2">
                            <input
                              className="h-[26px] w-[110px] rounded border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
                              value={sortOrders[t.code] ?? "0"}
                              onChange={setOrder(t.code)}
                            />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            {/* RIGHT: Small info panel like screenshot */}
            <div className="space-y-3">
              <div className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
                <div className="text-sm font-semibold text-gray-900">Department Name</div>
                <div className="mt-1 text-sm text-gray-700">{activeDept?.name || "-"}</div>

                <div className="mt-3 text-sm font-semibold text-gray-900">Sub department test</div>
                <div className="mt-1 text-sm text-gray-700">-</div>

                <button
                  type="button"
                  onClick={() => alert("Update Sortorder (demo)")}
                  className="mt-4 rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Update Sortorder
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ADD MODE */}
      {mode === "add" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Setup Department Add Mode</h2>
              {addError ? <p className="text-xs text-red-600 mt-1">{addError}</p> : null}
              {!addError ? <p className="text-xs text-red-600 mt-1">* Fields cannot be blank</p> : null}
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
            <FormRow label="Name">
              <input
                value={addForm.name}
                onChange={(e) => setAddForm((p) => ({ ...p, name: e.target.value }))}
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
    </div>
  );
};

export default SubDepartment;

/* ------------------------ Styling helpers (same as your ReferenceType/Users) ------------------------ */

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

const actionBtnCls =
  "rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50";
