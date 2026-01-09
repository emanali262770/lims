import React, { useMemo, useState } from "react";

const UserRight = () => {
  const [filters, setFilters] = useState({
    userName: "",
    moduleName: "",
  });

  const [hasRun, setHasRun] = useState(false);

  const users = useMemo(
    () => ["Please Select", "Receptionist", "Admin", "Account Office", "Lab Technician"],
    []
  );

  const modules = useMemo(
    () => ["Please Select", "LIMS", "Accounts", "HR", "Inventory"],
    []
  );

  // demo report rows (show after Run)
  const reportRows = useMemo(
    () => [
      {
        id: 1,
        menu: "Accounts",
        subMenu: "Reference / Doctors",
        add: false,
        edit: false,
        del: false,
        view: true,
      },
      {
        id: 2,
        menu: "Accounts",
        subMenu: "Reference Bill (Branch Wise)",
        add: false,
        edit: false,
        del: false,
        view: false,
      },
      {
        id: 3,
        menu: "Admin",
        subMenu: "Privileges",
        add: true,
        edit: true,
        del: false,
        view: true,
      },
      {
        id: 4,
        menu: "Admin",
        subMenu: "Roles",
        add: false,
        edit: false,
        del: false,
        view: true,
      },
    ],
    []
  );

  const onRun = () => {
    // you can validate filters here if needed
    setHasRun(true);
  };

  const onReset = () => {
    setFilters({ userName: "", moduleName: "" });
    setHasRun(false);
  };

  return (
    <div className="p-5">
      {/* Header (same style like RefrenceType/Users) */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div>
          <h1 className="text-xl font-semibold text-gray-900">User Rights Report</h1>
          <p className="text-sm text-gray-500">Select user & module, then run to view rights report.</p>
        </div>
      </div>

      {/* Filters Card (same styling) */}
      <div className="rounded-xl border border-gray-200 bg-white p-4 ">
        <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">User Name</label>
            <select
              className={filterCls}
              value={filters.userName}
              onChange={(e) => setFilters((p) => ({ ...p, userName: e.target.value }))}
            >
              {users.map((u) => (
                <option key={u} value={u === "Please Select" ? "" : u}>
                  {u}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="mb-1 block text-xs font-semibold text-gray-600">Module Name</label>
            <select
              className={filterCls}
              value={filters.moduleName}
              onChange={(e) => setFilters((p) => ({ ...p, moduleName: e.target.value }))}
            >
              {modules.map((m) => (
                <option key={m} value={m === "Please Select" ? "" : m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          {/* Actions */}
          <div className="flex items-end gap-2 lg:col-span-2">
            <button
              type="button"
              onClick={onRun}
              className="rounded-lg bg-secondary px-4 py-2 text-sm font-semibold text-white hover:brightness-95"
            >
              Run
            </button>

            <button
              type="button"
              onClick={onReset}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-50"
            >
              Reset
            </button>
          </div>
        </div>
      </div>

      {/* Report Table (show after Run) */}
      {hasRun && (
        <div className="mt-4 overflow-hidden rounded-xl border border-gray-200 bg-white ">
          <div className="flex items-center justify-between gap-3 px-4 py-3">
            <p className="text-sm text-gray-600">
              Showing{" "}
              <span className="font-semibold text-gray-900">{reportRows.length}</span>{" "}
              rights
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[900px] w-full text-sm">
              <thead className="bg-gray-50">
                <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                  <th className="px-4 py-3">Menu Name</th>
                  <th className="px-4 py-3">Sub Menu Name</th>
                  <th className="px-4 py-3 text-center">Add</th>
                  <th className="px-4 py-3 text-center">Edit</th>
                  <th className="px-4 py-3 text-center">Delete</th>
                  <th className="px-4 py-3 text-center">View</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {reportRows.map((r) => (
                  <tr key={r.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-semibold text-gray-900">{r.menu}</td>
                    <td className="px-4 py-3 text-gray-700">
                      <span className="block truncate">{r.subMenu}</span>
                    </td>

                    <td className="px-4 py-3 text-center">
                      <Dot checked={r.add} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Dot checked={r.edit} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Dot checked={r.del} />
                    </td>
                    <td className="px-4 py-3 text-center">
                      <Dot checked={r.view} />
                    </td>
                  </tr>
                ))}

                {reportRows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-8 text-center text-gray-500">
                      No report found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRight;

/* ------------------------ helpers ------------------------ */

const filterCls =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm outline-none focus:border-[#0a6d93] focus:ring-2 focus:ring-[#0a6d93]/20";

const Dot = ({ checked }) => (
  <span
    className={[
      "inline-flex h-5 w-5 items-center justify-center rounded-full border text-xs font-bold",
      checked ? "border-[#0a6d93] bg-[#0a6d93] text-white" : "border-gray-300 bg-white text-transparent",
    ].join(" ")}
    aria-label={checked ? "Yes" : "No"}
  >
    ✓
  </span>
);
