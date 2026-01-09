import React, { useMemo, useState } from "react";

const TestHead = () => {
  // VIEW MODES:
  // list     = main table screen
  // transfer = test transfer screen
  // add      = add mode form
  const [mode, setMode] = useState("list");

  // filters/search (same styling pattern as your RefrenceType)
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortDir, setSortDir] = useState("Asc");
  const [sortBy, setSortBy] = useState("Name");
  const [reportQuery, setReportQuery] = useState("");
  const [deptFilter, setDeptFilter] = useState("");

  // add form
  const [addError, setAddError] = useState("");
  const [addForm, setAddForm] = useState({
    name: "",
    reportName: "",
    department: "",
    showHeading: "--N/A--",
    sortOrder: "",
    status: "Active",
    remarks: "",
  });

  // transfer state
  const [transferContext, setTransferContext] = useState({
    departmentName: "Department of Hematology",
    reportName: "Blood Complete Examination",
    testHeading: "Blood Complete Examination",
  });
  const [transferDept, setTransferDept] = useState("Please Select");
  const [transferHeading, setTransferHeading] = useState("Please Select");

  // demo list data
  const rows = useMemo(
    () => [
      {
        id: 1,
        name: "Blood Complete Examination",
        reportName: "Blood Complete Examination",
        departmentName: "Department of Hematology",
        sortOrder: "1301",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 12:00 AM",
        modifiedBy: "admin",
        modifiedDate: "07/04/2025 10:35 AM",
      },
      {
        id: 2,
        name: "COAGULATION PROFILE (Routine Heam)",
        reportName: "Coagulation Profile",
        departmentName: "Department of Hematology",
        sortOrder: "1310",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 12:00 AM",
        modifiedBy: "admin",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 3,
        name: "BLOOD GROUP REPORT",
        reportName: "Blood Group Report",
        departmentName: "Department of Hematology",
        sortOrder: "1325",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 12:00 AM",
        modifiedBy: "admin",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 4,
        name: "CBC for Dengue",
        reportName: "Cbc For Dengue",
        departmentName: "Department of Hematology",
        sortOrder: "1305",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 12:00 AM",
        modifiedBy: "admin",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 5,
        name: "HEMATOLOGY REPORT.",
        reportName: "Hematology Report.",
        departmentName: "Department of Hematology",
        sortOrder: "0",
        status: "InActive",
        createdBy: "admin",
        createdDate: "28/11/2024 12:00 AM",
        modifiedBy: "admin",
        modifiedDate: "01/01/1900 12:00 AM",
      },
    ],
    []
  );

  const departments = useMemo(
    () => ["Department of Hematology", "Department of Microbiology", "Department of Chemical Pathology"],
    []
  );

  const filtered = useMemo(() => {
    const rq = reportQuery.trim().toLowerCase();

    let out = rows.filter((r) => {
      const okStatus = statusFilter === "All" ? true : r.status === statusFilter;
      const okDept = !deptFilter ? true : r.departmentName === deptFilter;
      const okReport = !rq ? true : (r.reportName || "").toLowerCase().includes(rq);
      return okStatus && okDept && okReport;
    });

    out.sort((a, b) => {
      const field = sortBy === "Name" ? "name" : "reportName";
      const av = (a[field] || "").toString();
      const bv = (b[field] || "").toString();
      const cmp = av.localeCompare(bv);
      return sortDir === "Asc" ? cmp : -cmp;
    });

    return out;
  }, [rows, statusFilter, deptFilter, reportQuery, sortDir, sortBy]);

  // safe error -> string
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
    setAddForm({
      name: "",
      reportName: "",
      department: "",
      showHeading: "--N/A--",
      sortOrder: "",
      status: "Active",
      remarks: "",
    });
    setMode("add");
  };

  const openTransfer = (row) => {
    setTransferContext({
      departmentName: row?.departmentName || "Department of Hematology",
      reportName: row?.reportName || "Blood Complete Examination",
      testHeading: row?.name || "Blood Complete Examination",
    });
    setTransferDept("Please Select");
    setTransferHeading("Please Select");
    setMode("transfer");
  };

  const onRunSearch = () => {
    // demo only
    alert("Run / Search (demo).");
  };

  const onSaveAdd = (e) => {
    e.preventDefault();
    try {
      if (!addForm.name.trim()) throw new Error("Fields cannot be blank");
      if (!addForm.reportName.trim()) throw new Error("Fields cannot be blank");
      if (!addForm.department.trim()) throw new Error("Fields cannot be blank");

      setAddError("");
      alert("Saved (demo).");
      setMode("list");
    } catch (err) {
      setAddError(toErrorText(err));
    }
  };

  const onTransferSave = (e) => {
    e.preventDefault();
    alert("Transfer saved (demo).");
    setMode("list");
  };

  return (
    <div className="p-5">
      {/* LIST MODE */}
      {mode === "list" && (
        <>
          {/* Header (same as your RefrenceType list header style) */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Setup Test Head</h1>
              <p className="text-sm text-gray-500">Manage test headings, reports, departments and status.</p>
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
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-5">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Status</label>
                <select className={filterCls} value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
                  <option value="All">All</option>
                  <option value="A">A</option>
                  <option value="I">I</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort</label>
                <select className={filterCls} value={sortDir} onChange={(e) => setSortDir(e.target.value)}>
                  <option value="Asc">Asc</option>
                  <option value="Desc">Desc</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Sort By</label>
                <select className={filterCls} value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                  <option value="Name">Name</option>
                  <option value="Report Name">Report Name</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">Report Name</label>
                <input
                  className={filterCls}
                  value={reportQuery}
                  onChange={(e) => setReportQuery(e.target.value)}
                  placeholder="Report name..."
                />
              </div>

              <div className="">
                <label className="mb-1 block text-xs font-semibold text-gray-600">Department</label>
                <select className={filterCls} value={deptFilter} onChange={(e) => setDeptFilter(e.target.value)}>
                  <option value="">All</option>
                  {departments.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={onRunSearch}
                className="rounded-lg bg-gray-900 px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
              >
                Search
              </button>

              <button
                type="button"
                onClick={() => {
                  setStatusFilter("All");
                  setSortDir("Asc");
                  setSortBy("Name");
                  setReportQuery("");
                  setDeptFilter("");
                }}
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
                Showing <span className="font-semibold text-gray-900">{filtered.length}</span> test heads
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Report Name</th>
                    <th className="px-4 py-3">Department Name</th>
                    <th className="px-4 py-3">Sort Order</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created By</th>
                    <th className="px-4 py-3">Created Date</th>
                    <th className="px-4 py-3">Modified By</th>
                    <th className="px-4 py-3">Modified Date</th>
                    <th className="px-4 py-3 text-right">Edit</th>
                    <th className="px-4 py-3 text-right">Test Transfer</th>
                    <th className="px-4 py-3 text-right">History</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-700">{r.reportName}</td>
                      <td className="px-4 py-3 text-gray-700">{r.departmentName}</td>
                      <td className="px-4 py-3 text-gray-700">{r.sortOrder}</td>

                      <td className="px-4 py-3">
                        <span
                          className={[
                            "inline-flex items-center rounded-full px-2.5 py-1 text-xs font-semibold",
                            r.status === "Active" ? "bg-green-50 text-green-700" : "bg-gray-100 text-gray-700",
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
                          onClick={() => alert(`Edit (demo): ${r.name}`)}
                        >
                          Edit
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => openTransfer(r)}
                        >
                          Test Transfer
                        </button>
                      </td>

                      <td className="px-4 py-3 text-right">
                        <button
                          type="button"
                          className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                          onClick={() => alert(`Show Edit History (demo): ${r.name}`)}
                        >
                          Show Edit History
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={12} className="px-4 py-8 text-center text-gray-500">
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
              <p className="text-sm text-gray-500">Move tests to another department / heading (demo UI).</p>
            </div>

            <button
              type="button"
              onClick={() => setMode("list")}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Back
            </button>
          </div>

          <form onSubmit={onTransferSave}>
            <div className="flex flex-wrap items-start gap-3">
              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => alert("Transfer to new department (demo)")}
              >
                Transfer to new department
              </button>

              <button
                type="button"
                className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
                onClick={() => setMode("list")}
              >
                Back To Department
              </button>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-6 lg:grid-cols-[1fr_380px]">
              {/* LEFT: available tests */}
              <div className="space-y-3">
                <div className="text-sm font-semibold text-gray-900">Available Tests</div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-sm text-gray-700">
                    <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />
                    <span>Select all</span>
                  </label>

                  <select className="h-[26px] rounded border border-gray-300 bg-white px-2 text-xs outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20">
                    <option>Department of Advanced Chemical Pathology</option>
                    <option>Department of Hematology</option>
                    <option>Department of Microbiology</option>
                  </select>
                </div>

                <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                  <div className="overflow-x-auto">
                    <table className="min-w-[720px] w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                          <th className="px-4 py-3 w-[60px]"> </th>
                          <th className="px-4 py-3 w-[100px]">Test Code</th>
                          <th className="px-4 py-3">Test Name</th>
                          <th className="px-4 py-3 w-[180px]">Department</th>
                          <th className="px-4 py-3 w-[140px]">Sort Order</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-gray-100">
                        {demoTransferTests.map((t) => (
                          <tr key={t.code} className="hover:bg-gray-50">
                            <td className="px-4 py-3">
                              <input type="checkbox" className="h-3.5 w-3.5 rounded border-gray-300" />
                            </td>
                            <td className="px-4 py-3 text-gray-700">{t.code}</td>
                            <td className="px-4 py-3 text-gray-700">{t.name}</td>
                            <td className="px-4 py-3 text-gray-700">{t.department}</td>
                            <td className="px-4 py-3">
                              <input className={inputCls} defaultValue={t.sortOrder} />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              {/* RIGHT: context + selectors */}
              <div className="space-y-3">
                <div className="rounded-xl border border-gray-200 bg-white p-4">
                  <div className="space-y-2 text-sm">
                    <div className="text-gray-600">
                      <span className="font-semibold text-gray-900">Department Name:</span>{" "}
                      {transferContext.departmentName}
                    </div>
                    <div className="text-gray-600">
                      <span className="font-semibold text-gray-900">Report Name:</span>{" "}
                      {transferContext.reportName} {" > "} {transferContext.testHeading}
                    </div>
                  </div>
                </div>

                <div className="space-y-3 rounded-xl border border-gray-200 bg-white p-4">
                  <FormRow label="Department Name">
                    <select className={inputCls} value={transferDept} onChange={(e) => setTransferDept(e.target.value)}>
                      <option>Please Select</option>
                      {departments.map((d) => (
                        <option key={d} value={d}>
                          {d}
                        </option>
                      ))}
                    </select>
                  </FormRow>

                  <FormRow label="Test Heading">
                    <select
                      className={inputCls}
                      value={transferHeading}
                      onChange={(e) => setTransferHeading(e.target.value)}
                    >
                      <option>Please Select</option>
                      <option>Blood Complete Examination</option>
                      <option>Coagulation Profile</option>
                      <option>Hematology Report</option>
                    </select>
                  </FormRow>

                  <div className="pt-1">
                    <button
                      type="submit"
                      className="rounded bg-red-600 px-3 py-1 text-xs font-bold text-white hover:brightness-95"
                    >
                      Update Sortorder
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* ADD MODE */}
      {mode === "add" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Setup Test Head Add Mode</h2>
              <p className="text-xs text-red-600 mt-1">* Fields cannot be blank</p>
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

          <form onSubmit={onSaveAdd} className="space-y-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[520px_520px]">
              {/* LEFT */}
              <div className="space-y-3">
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

                <FormRow label="Report Name">
                  <input
                    value={addForm.reportName}
                    onChange={(e) => setAddForm((p) => ({ ...p, reportName: e.target.value }))}
                    className={[
                      inputCls,
                      addError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                    ].join(" ")}
                  />
                </FormRow>

                <FormRow label="Department">
                  <select
                    value={addForm.department}
                    onChange={(e) => setAddForm((p) => ({ ...p, department: e.target.value }))}
                    className={[
                      inputCls,
                      addError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                    ].join(" ")}
                  >
                    <option value="">Please Select</option>
                    {departments.map((d) => (
                      <option key={d} value={d}>
                        {d}
                      </option>
                    ))}
                  </select>
                </FormRow>

                <FormRow label="Show Heading">
                  <select
                    value={addForm.showHeading}
                    onChange={(e) => setAddForm((p) => ({ ...p, showHeading: e.target.value }))}
                    className={inputCls}
                  >
                    <option>--N/A--</option>
                    <option>Yes</option>
                    <option>No</option>
                  </select>
                </FormRow>
              </div>

              {/* RIGHT */}
              <div className="space-y-3">
                <FormRow label="Sort Order">
                  <input
                    value={addForm.sortOrder}
                    onChange={(e) => setAddForm((p) => ({ ...p, sortOrder: e.target.value }))}
                    className={inputCls}
                  />
                </FormRow>

                <FormRow label="Status">
                  <select
                    value={addForm.status}
                    onChange={(e) => setAddForm((p) => ({ ...p, status: e.target.value }))}
                    className={inputCls}
                  >
                    <option>Active</option>
                    <option>Inactive</option>
                  </select>
                </FormRow>
              </div>
            </div>

            {/* Remarks big box */}
            <div className="grid grid-cols-1 gap-3 lg:grid-cols-[170px_1fr]">
              <label className="text-xs font-semibold text-gray-700 text-right">Remarks:</label>
              <textarea
                value={addForm.remarks}
                onChange={(e) => setAddForm((p) => ({ ...p, remarks: e.target.value }))}
                className="min-h-[260px] w-full rounded-lg border border-gray-300 bg-white p-3 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20"
              />
            </div>

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

export default TestHead;

/* ------------------------ helpers (same as your RefrenceType) ------------------------ */

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

/* ------------------------ demo data (transfer table) ------------------------ */

const demoTransferTests = [
  { code: "1301", name: "Hemoglobin (HB)", department: "Special Chemistry", sortOrder: "0" },
  { code: "1303", name: "DLC (Differential Leukocyte Count)", department: "Special Chemistry", sortOrder: "0" },
  { code: "1310", name: "Total RBCs", department: "Special Chemistry", sortOrder: "0" },
  { code: "1289", name: "Platelet Count", department: "Special Chemistry", sortOrder: "0" },
  { code: "1292", name: "**Reticulocytes", department: "Special Chemistry", sortOrder: "0" },
  { code: "1321", name: "HCT (Hematocrit)", department: "Special Chemistry", sortOrder: "0" },
  { code: "1415", name: "MCV", department: "Special Chemistry", sortOrder: "0" },
  { code: "3729", name: "MCH", department: "Special Chemistry", sortOrder: "0" },
  { code: "1417", name: "MCHC", department: "Special Chemistry", sortOrder: "0" },
  { code: "1422", name: "Absolute Eosinophil", department: "Special Chemistry", sortOrder: "0" },
];
