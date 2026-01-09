import React, { useMemo, useState } from "react";

const SpecimanSetup = () => {
  // VIEW MODES:
  // list = main table screen
  // add  = add specimen form
  const [mode, setMode] = useState("list");

  // filters/search (same style as Reference Type)
  const [sortDir, setSortDir] = useState("Asc");
  const [sortBy, setSortBy] = useState("Name");
  const [statusFilter, setStatusFilter] = useState("All");
  const [query, setQuery] = useState("");

  // add form
  const [addForm, setAddForm] = useState({
    name: "",
    description: "",
    status: "Active",
  });
  const [addError, setAddError] = useState("");

  // demo rows
  const rows = useMemo(
    () => [
      {
        id: 1,
        name: "Abdominal Fluid",
        description: "admin",
        status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 2,
        name: "Ascitic Fluid",
        description: "admin",
        status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 3,
        name: "Ascitic Fluid and Serum",
        description: "admin",
         status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 4,
        name: "Aspirate - Fluid",
        description: "admin",
        status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 5,
        name: "Blocks",
        description: "admin",
        status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 6,
        name: "Blood in C/S Bottle",
        description: "admin",
         status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 7,
        name: "Body Fluid",
        description: "admin",
         status: "Active",
        createdBy: "admin",
        createdDate: "",
        modifiedBy: "",
        modifiedDate: "",
      },
      {
        id: 8,
        name: "Body Fluid & Serum",
        description: "admin",
        status: "Active",
        createdBy: "admin",
        createdDate: "",
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
      const okQuery =
        !q ||
        (r.name || "").toLowerCase().includes(q) ||
        (r.description || "").toLowerCase().includes(q);
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
  }, [rows, query, statusFilter, sortBy, sortDir]);

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
    setAddForm({ name: "", description: "", status: "Active" });
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

  return (
    <div className="p-5">
      {/* LIST MODE */}
      {mode === "list" && (
        <>
          {/* Header (exact like Reference Type list header) */}
          <div className="mb-4 flex items-start justify-between gap-3">
            <div>
              <h1 className="text-xl font-semibold text-gray-900">
                Setup Specimen Category
              </h1>
              <p className="text-sm text-gray-500">
                Manage specimen categories, description and status.
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

          {/* Filters Card (exact like Reference Type list filters) */}
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
                  Status
                </label>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className={filterCls}
                >
                  <option value="All">All</option>
                  <option value="A">A</option>
                  <option value="I">I</option>
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
                  placeholder="Name / Description..."
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
                  setStatusFilter("All");
                  setQuery("");
                }}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
              >
                Reset
              </button>
            </div>
          </div>

          {/* Table Card (exact like Reference Type list table card) */}
          <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between gap-3 px-4 py-3">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-semibold text-gray-900">{filtered.length}</span>{" "}
                specimen categories
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="min-w-[1100px] w-full text-sm">
                <thead className="bg-gray-50">
                  <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                    <th className="px-4 py-3">Name</th>
                    <th className="px-4 py-3">Description</th>
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

      {/* ADD MODE (exact like Reference Type add mode) */}
      {mode === "add" && (
        <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
          <div className="mb-4 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">
                Setup Specimen Category Add Mode
              </h2>
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

export default SpecimanSetup;

/* ------------------------ Styling helpers (same as Reference Type) ------------------------ */

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
