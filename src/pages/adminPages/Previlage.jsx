import React, { useMemo, useState } from "react";

const Previlage = () => {
    const modules = ["LIMS", "Accounts", "HR", "Inventory"];

    const rightsRows = useMemo(
        () => [
            { id: 1, menu: "Accounts", subMenu: "Reference / Doctors" },
            { id: 2, menu: "Accounts", subMenu: "Reference Bill (Branch Wise)" },
            { id: 3, menu: "Accounts", subMenu: "Reference Bill (Center Wise)" },
            { id: 4, menu: "Accounts", subMenu: "Reference Bill (Reference Wise)" },
            { id: 5, menu: "Accounts", subMenu: "Voucher" },
            { id: 6, menu: "Admin", subMenu: "Privileges" },
            { id: 7, menu: "Admin", subMenu: "Reference Types" },
            { id: 8, menu: "Admin", subMenu: "Roles" },
            { id: 9, menu: "Admin", subMenu: "User Rights Report" },
        ],
        []
    );

    const listRows = useMemo(
        () => [
            {
                id: 101,
                name: "Account Office",
                createdBy: "admin",
                createdDate: "22/08/2023 3:53 PM",
                modifiedBy: "",
                modifiedDate: "",
            },
            {
                id: 102,
                name: "Accounts & Inventory",
                createdBy: "admin",
                createdDate: "08/06/2024 3:17 PM",
                modifiedBy: "",
                modifiedDate: "",
            },
            {
                id: 103,
                name: "Assistant Manager",
                createdBy: "Basit",
                createdDate: "26/11/2024 1:39 PM",
                modifiedBy: "",
                modifiedDate: "",
            },
            {
                id: 104,
                name: "ALJAMAL",
                createdBy: "ALJAMAL",
                createdDate: "21/10/2024 9:43 AM",
                modifiedBy: "ALJAMAL",
                modifiedDate: "21/10/2024 9:44 AM",
            },
        ],
        []
    );

    const [form, setForm] = useState({
        privilegeName: "Account Office",
        moduleName: "LIMS",
        status: "Active",
    });

    // rights state per row
    const [rights, setRights] = useState(() => {
        const initial = {};
        rightsRows.forEach((r) => {
            initial[r.id] = { add: false, edit: false, del: false, view: false };
        });
        // demo: tick some boxes
        if (initial[1]) initial[1].view = true;
        if (initial[6]) initial[6] = { add: true, edit: true, del: false, view: true };
        return initial;
    });

    const [errors, setErrors] = useState({ privilegeName: "" });

    const onToggle = (rowId, key) => {
        setRights((prev) => ({
            ...prev,
            [rowId]: { ...prev[rowId], [key]: !prev[rowId]?.[key] },
        }));
    };

    const validate = () => {
        const next = { privilegeName: "" };
        if (!form.privilegeName.trim()) next.privilegeName = "Fields cannot be blank";
        setErrors(next);
        return !next.privilegeName;
    };

    const onUpdate = (e) => {
        e.preventDefault();
        if (!validate()) return;

        // submit payload example
        const payload = {
            ...form,
            rights: rightsRows.map((r) => ({ ...r, ...rights[r.id] })),
        };

        console.log("UPDATE PAYLOAD:", payload);
        alert("Saved (check console for payload).");
    };

    const onCancel = () => {
        setForm({ privilegeName: "", moduleName: "LIMS", status: "Active" });
        setErrors({ privilegeName: "" });
        // reset rights
        setRights(() => {
            const initial = {};
            rightsRows.forEach((r) => {
                initial[r.id] = { add: false, edit: false, del: false, view: false };
            });
            return initial;
        });
    };

    const Checkbox = ({ checked, onChange }) => (
        <button
            type="button"
            onClick={onChange}
            className={[
                "h-4 w-4 rounded border flex items-center justify-center",
                checked ? "bg-[#0a6d93] border-[#0a6d93]" : "bg-white border-gray-400",
            ].join(" ")}
            aria-pressed={checked}
        >
            {checked ? <span className="text-white text-[11px] leading-none">✓</span> : null}
        </button>
    );

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="">
                {/* Top Card */}
                <div className=" bg-white ">
                    {/* Header */}
                    <div className="border-b border-gray-300 bg-[#e9f2f7] px-4 py-2">
                        <div className="text-sm font-semibold text-gray-800">Privileges</div>
                        <div className="text-xs text-gray-600">Add/Edit Mode</div>
                    </div>

                    <form onSubmit={onUpdate} className="p-4">
                        {/* Form row: Privileges + Module */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_360px_1fr] md:items-center">
                            <div className="text-sm font-semibold text-gray-800">
                                Privileges: <span className="text-red-600">*</span>
                            </div>

                            <div className="space-y-1">
                                <input
                                    value={form.privilegeName}
                                    onChange={(e) =>
                                        setForm((p) => ({ ...p, privilegeName: e.target.value }))
                                    }
                                    className={[
                                        "h-8 w-full rounded-sm border px-2 text-sm outline-none",
                                        errors.privilegeName ? "border-red-500" : "border-gray-300",
                                    ].join(" ")}
                                    placeholder="Enter privilege name"
                                />
                                {errors.privilegeName ? (
                                    <div className="text-xs text-red-600">{errors.privilegeName}</div>
                                ) : (
                                    <div className="text-xs text-transparent">.</div>
                                )}
                            </div>

                            <div className="flex flex-wrap items-center gap-3 md:justify-end">
                                <div className="text-sm text-gray-800">
                                    <span className="font-semibold">Module Name</span>{" "}
                                </div>
                                <select
                                    value={form.moduleName}
                                    onChange={(e) =>
                                        setForm((p) => ({ ...p, moduleName: e.target.value }))
                                    }
                                    className="h-8 w-40 rounded-sm border border-gray-300 bg-white px-2 text-sm outline-none"
                                >
                                    {modules.map((m) => (
                                        <option key={m} value={m}>
                                            {m}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Rights table */}
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[140px_1fr]">
                            <div className="pt-2 text-sm font-semibold text-gray-800">
                                Please select rights:
                            </div>

                            {/* Card container */}
                            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                <div className="overflow-x-auto">
                                    <table className="min-w-[860px] w-full table-fixed text-sm">
                                        {/* TABLE HEADER */}
                                        <thead className="bg-gray-50">
                                            <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                                                <th className="w-[170px] px-4 py-2">Menu Name</th>
                                                <th className="px-4 py-2">Sub Menu Name</th>
                                                <th className="w-[90px] px-4 py-2 text-center">Add</th>
                                                <th className="w-[90px] px-4 py-2 text-center">Edit</th>
                                                <th className="w-[90px] px-4 py-2 text-center">Delete</th>
                                                <th className="w-[90px] px-4 py-2 text-center">View</th>
                                            </tr>
                                        </thead>

                                        {/* TABLE BODY */}
                                        <tbody className="divide-y divide-gray-100">
                                            {rightsRows.map((r) => {
                                                const row = rights[r.id] || {
                                                    add: false,
                                                    edit: false,
                                                    del: false,
                                                    view: false,
                                                };

                                                return (
                                                    <tr key={r.id} className="hover:bg-gray-50">
                                                        {/* Menu */}
                                                        <td className="px-4 py-2 font-semibold text-gray-900">
                                                            {r.menu}
                                                        </td>

                                                        {/* Sub Menu */}
                                                        <td className="px-4 py-2 text-gray-700">
                                                            <span className="block truncate">{r.subMenu}</span>
                                                        </td>

                                                        {/* Add */}
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={row.add}
                                                                    onChange={() => onToggle(r.id, "add")}
                                                                />
                                                            </div>
                                                        </td>

                                                        {/* Edit */}
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={row.edit}
                                                                    onChange={() => onToggle(r.id, "edit")}
                                                                />
                                                            </div>
                                                        </td>

                                                        {/* Delete */}
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={row.del}
                                                                    onChange={() => onToggle(r.id, "del")}
                                                                />
                                                            </div>
                                                        </td>

                                                        {/* View */}
                                                        <td className="px-4 py-2">
                                                            <div className="flex justify-center">
                                                                <Checkbox
                                                                    checked={row.view}
                                                                    onChange={() => onToggle(r.id, "view")}
                                                                />
                                                            </div>
                                                        </td>
                                                    </tr>
                                                );
                                            })}

                                            {/* Empty state */}
                                            {rightsRows.length === 0 && (
                                                <tr>
                                                    <td
                                                        colSpan={6}
                                                        className="px-4 py-8 text-center text-gray-500"
                                                    >
                                                        No rights found.
                                                    </td>
                                                </tr>
                                            )}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>


                        {/* Status + Buttons */}
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[140px_260px_1fr] md:items-center">
                            <div className="text-sm font-semibold text-gray-800">Status:</div>

                            <select
                                value={form.status}
                                onChange={(e) => setForm((p) => ({ ...p, status: e.target.value }))}
                                className="h-8 w-full rounded-sm border border-gray-300 bg-white px-2 text-sm outline-none md:w-64"
                            >
                                <option value="Active">Active</option>
                                <option value="Inactive">Inactive</option>
                            </select>

                            <div className="flex gap-2 md:justify-start">
                                <button
                                    type="submit"
                                    className="h-8 rounded-sm bg-red-600 px-4 text-sm font-semibold text-white hover:bg-red-700"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={onCancel}
                                    className="h-8 rounded-sm bg-gray-700 px-4 text-sm font-semibold text-white hover:bg-gray-800"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Bottom List Table */}

                <div className="mt-4 overflow-hidden rounded-xl  bg-white ">
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">{listRows.length}</span>{" "}
                            privileges
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-[1000px] w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                                    <th className="px-4 py-2">Privileges Name</th>
                                    <th className="px-4 py-2">Created By</th>
                                    <th className="px-4 py-2">Created Date</th>
                                    <th className="px-4 py-2">Modified By</th>
                                    <th className="px-4 py-2">Modified Date</th>
                                    <th className="px-4 py-2 text-right">Edit</th>
                                    <th className="px-4 py-2 text-right">History</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {listRows.map((r, idx) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 font-semibold text-gray-900">{r.name}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.createdBy}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.createdDate}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.modifiedBy || "-"}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.modifiedDate || "-"}</td>

                                        <td className="px-4 py-3 text-right">
                                            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                                Edit
                                            </button>
                                        </td>

                                        <td className="px-4 py-3 text-right">
                                            <button className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm font-semibold text-gray-700 hover:bg-gray-50">
                                                History
                                            </button>
                                        </td>
                                    </tr>
                                ))}

                                {listRows.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            No privileges found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>


                {/* Small footer spacing */}
                <div className="h-6" />
            </div>
        </div>
    );
};

export default Previlage;
