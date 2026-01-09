import React, { useMemo, useState } from "react";

const Specimens = () => {
  const [mode, setMode] = useState("list");

  // filters/search (same styling as your ReferenceType)
  const [sortDir, setSortDir] = useState("Asc");
  const [sortBy, setSortBy] = useState("Name");
  const [recordsFilter, setRecordsFilter] = useState("240 Records");
  const [query, setQuery] = useState("");

  // add form
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    category: "",
    status: "Active",
  });
  const [addError, setAddError] = useState("");

  // demo rows (same columns like screenshot)
  const rows = useMemo(
    () => [
      {
        id: 1,
        name: "(Fasting) 3-5cc Clotted Blood or Serum",
        description: "(Fasting) 3-5cc Clotted Blood or Serum",
        category: "Blood",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 2,
        name: "1 vial EDTA and 1 vial Clotted Blood",
        description: "1 vial EDTA and 1 vial Clotted Blood",
        category: "Blood",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 3,
        name: "10cc Clotted Blood (Not Serum)",
        description: "10cc Clotted Blood (Not Serum)",
        category: "Blood",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 4,
        name: "10CC EDTA Blood",
        description: "10CC EDTA Blood",
        category: "Blood",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 5,
        name: "2 Vials of Lithium Heparin",
        description: "2 Vials of Lithium Heparin",
        category: "Blood",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
      {
        id: 6,
        name: "24 Hrs Urine",
        description: "24 Hrs Urine",
        category: "Urine",
        status: "Active",
        createdBy: "admin",
        createdDate: "28/11/2024 11:53 AM",
        modifiedBy: "",
        modifiedDate: "01/01/1900 12:00 AM",
      },
    ],
    []
  );

  const categories = useMemo(
    () => ["Please Select", "Blood", "Serum", "Plasma", "Urine", "Stool"],
    []
  );

  // ✅ FIX 1: recordsFilter is NOT status, so don't compare it with r.status
  // ✅ FIX 2: Reset sets recordsFilter to a valid option
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();

    let out = rows.filter((r) => {
      // Records dropdown is just UI (240/260/300). It should not filter by status.
      const okRecords = true;

      const okQuery =
        !q ||
        (r.name || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q) ||
        (r.category || "").toLowerCase().includes(q);

      return okRecords && okQuery;
    });

    out.sort((a, b) => {
      const field = sortBy === "Name" ? "name" : "createdDate";
      const av = (a[field] || "").toString();
      const bv = (b[field] || "").toString();
      const cmp = av.localeCompare(bv);
      return sortDir === "Asc" ? cmp : -cmp;
    });

    // Optional: if you want "240 Records" to mean "show first 240"
    // it won't affect your demo because rows are only 6, but it's correct logic.
    const limit = parseInt((recordsFilter || "").split(" ")[0], 10);
    if (!Number.isNaN(limit)) out = out.slice(0, limit);

    return out;
  }, [rows, query, recordsFilter, sortBy, sortDir]);

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
      description: "",
      category: "",
      status: "Active",
    });
    setMode("add");
  };

  const onSaveAdd = (e) => {
    e.preventDefault();
    try {
      if (!addForm.name.trim()) throw new Error("Fields cannot be blank");
      if (!addForm.category || addForm.category === "Please Select")
        throw new Error("Fields cannot be blank");

      setAddError("");
      alert("Saved (demo).");
      setMode("list");
    } catch (err) {
      setAddError(toErrorText(err));
    }
  };

  return (
    <div className="p-5">
      {/* LIST MODE */}
      {mode === "list" && (
        <>
          {/* Header (same as ReferenceType list) */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">Setup Specimen</h1>
              <p className="text-sm text-gray-500">
                Manage specimen, description, category and status.
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

          {/* Filters Card (same as ReferenceType) */}
          <div className="rounded-xl border border-gray-200 bg-white p-4">
            <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Sort
                </label>
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
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Sort By
                </label>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={filterCls}
                >
                  <option value="Name">Name</option>
                  <option value="Created Date">Created Date</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Records
                </label>
                <select
                  value={recordsFilter}
                  onChange={(e) => setRecordsFilter(e.target.value)}
                  className={filterCls}
                >
                  <option value="240 Records">240 Records</option>
                  <option value="260 Records">260 Records</option>
                  <option value="300 Records">300 Records</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-xs font-semibold text-gray-600">
                  Search
                </label>
                <input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className={filterCls}
                  placeholder="Name / Description / Category..."
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
                  setSortBy("Name");
                  // ✅ FIX: keep it as one of the dropdown options
                  setRecordsFilter("240 Records");
                  setQuery("");
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Card (same as ReferenceType) */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                specimens
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1200px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Description</th>
                    <th className="px-4 py-3">Category</th>
                    <th className="px-4 py-3">Status</th>
                    <th className="px-4 py-3">Created by</th>
                    <th className="px-4 py-3">Created date</th>
                    <th className="px-4 py-3">Modified by</th>
                    <th className="px-4 py-3">Modified date</th>
                    <th className="px-4 py-3 text-right">Edit</th>
                    <th className="px-4 py-3 text-right">History</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {filtered.map((r) => (
                    <tr key={r.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3 font-semibold text-gray-900">{r.name}</td>
                      <td className="px-4 py-3 text-gray-700">{r.description}</td>
                      <td className="px-4 py-3 text-gray-700">{r.category || "-"}</td>

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
                      <td className="px-4 py-3 text-gray-700">{r.createdDate || "-"}</td>
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
                          onClick={() => alert(`Show Edit History (demo): ${r.name}`)}
                        >
                          Show Edit History
                        </button>
                      </td>
                    </tr>
                  ))}

                  {filtered.length === 0 && (
                    <tr>
                      <td colSpan={10} className="px-4 py-8 text-center text-gray-500">
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

      {/* ADD MODE (same styling as your ReferenceType add mode) */}
      {mode === "add" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Setup Specimen Add Mode</h2>
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

            <FormRow label="Description">
              <input
                value={addForm.description}
                onChange={(e) => setAddForm((p) => ({ ...p, description: e.target.value }))}
                className={inputCls}
              />
            </FormRow>

            <FormRow label="Category">
              <select
                value={addForm.category}
                onChange={(e) => setAddForm((p) => ({ ...p, category: e.target.value }))}
                className={[
                  inputCls,
                  addError ? "border-red-500 focus:border-red-500 focus:ring-red-500/10" : "",
                ].join(" ")}
              >
                {categories.map((c) => (
                  <option key={c} value={c === "Please Select" ? "" : c}>
                    {c}
                  </option>
                ))}
              </select>
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

export default Specimens;

/* ------------------------ Styling helpers (same as ReferenceType) ------------------------ */

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
