import React, { useMemo, useState } from "react";

const Roles = () => {
    // Left list (Privileges)
    const privileges = useMemo(
        () => [
            "Receptionist",
            "SMD Section",
            "Lab Technician",
            "Shift Supervisor 1",
            "Accounts & Inventory",
            "Reception for Collection Centers",
            "Inventory Modules",
            "admin -",
            "Stat Lab Users",
            "Business Development",
            "FOR BLOOD BANK",
            "Manager Laboratories",
            "Manager outreach",
            "Multan & Gujrawala Stat",
        ],
        []
    );

    // Right tabs + permissions
    const tabs = useMemo(
        () => ["Daily Ledger", "Front Desk", "Edit Patient", "Result Entry", "General"],
        []
    );

    const permissionsByTab = useMemo(
        () => ({
            "Daily Ledger": [
                "Dues Receive",
                "Edit Patient Info",
                "Edit Patient Test",
                "Barcode Print",
                "Cancel Registration",
                "Lab Copy",
                "Patient Copy",
                "Indoor Bill",
                "Show Summary",
                "Company Transfer",
                "Test Cancellation",
                "IPD Bill Receive",
            ],
            "Front Desk": ["Change Amount", "Add Test", "Delete Test"],
            "Edit Patient": [
                "Test Status Change",
                "Show Audit Record to User",
                "Franchise Comments Option",
            ],
            "Result Entry": ["Allow Critical Result Entry", "Save Result", "Save and Conduct"],
            General: [
                "Change Button Rights in Company Doctor",
                "Discount Allow Company Doctors",
                "Discount Allow on Patient Recovery Page",
            ],
        }),
        []
    );

    // Form state
    const [roleName, setRoleName] = useState("");
    const [status, setStatus] = useState("Active");
    const [error, setError] = useState("");

    // Left selected privilege
    const [selectedPrivilege, setSelectedPrivilege] = useState(privileges[0]);

    // Action toggle per privilege (checkbox column)
    const [privAction, setPrivAction] = useState(() => {
        const initial = {};
        privileges.forEach((p) => (initial[p] = false));
        // demo
        initial["Receptionist"] = true;
        initial["Accounts & Inventory"] = true;
        return initial;
    });

    // Right permissions checked per tab
    const [activeTab, setActiveTab] = useState(tabs[0]);
    const [checkedPerms, setCheckedPerms] = useState(() => {
        const initial = {};
        Object.keys(permissionsByTab).forEach((t) => {
            initial[t] = {};
            permissionsByTab[t].forEach((p) => (initial[t][p] = false));
        });
        // demo
        initial["Daily Ledger"]["Dues Receive"] = true;
        initial["Result Entry"]["Save Result"] = true;
        initial["General"]["Discount Allow Company Doctors"] = true;
        return initial;
    });

    // Bottom table rows (existing roles)
    const roleRows = useMemo(
        () => [
            {
                id: 1,
                role: "Receptionist",
                createdBy: "",
                createdDate: "",
                modifiedBy: "Basit",
                modifiedDate: "03/11/2024 1:41 PM",
            },
            {
                id: 2,
                role: "SMD Section",
                createdBy: "",
                createdDate: "",
                modifiedBy: "MAZHAR",
                modifiedDate: "18/04/2025 9:55 AM",
            },
            {
                id: 3,
                role: "Lab Technician",
                createdBy: "",
                createdDate: "",
                modifiedBy: "MAZHAR",
                modifiedDate: "15/04/2025 10:26 AM",
            },
            {
                id: 4,
                role: "Shift Supervisor 1",
                createdBy: "",
                createdDate: "",
                modifiedBy: "admin",
                modifiedDate: "30/05/2024",
            },
        ],
        []
    );

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

    const onSave = (e) => {
        e.preventDefault();
        if (!roleName.trim()) {
            setError("Fields cannot be blank");
            return;
        }
        setError("");

        const payload = {
            roleName,
            status,
            selectedPrivilege,
            privileges: privAction,
            permissions: checkedPerms,
        };

        console.log("SAVE ROLE PAYLOAD:", payload);
        alert("Saved (check console for payload).");
    };

    const onCancel = () => {
        setRoleName("");
        setStatus("Active");
        setError("");
    };

    const togglePrivilegeAction = (name) => {
        setPrivAction((p) => ({ ...p, [name]: !p[name] }));
    };

    const togglePermission = (tab, perm) => {
        setCheckedPerms((prev) => ({
            ...prev,
            [tab]: { ...prev[tab], [perm]: !prev[tab]?.[perm] },
        }));
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4 md:p-6">
            <div className="">
                {/* Top Card */}
                <div className="bg-white">
                    {/* Header (same as Previlage) */}
                    <div className="border-b border-gray-300 bg-secondary px-4 py-2">
                        <div className="text-sm font-semibold text-white">Roles</div>
                        <div className="text-xs text-gray-200">Add/Edit Mode</div>
                    </div>

                    <form onSubmit={onSave} className="p-4">
                        {/* Role input row (same grid feel) */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-[140px_360px_1fr] md:items-center">
                            <div className="text-sm font-semibold text-gray-800">
                                Role: <span className="text-red-600">*</span>
                            </div>

                            <div className="space-y-1">
                                <input
                                    value={roleName}
                                    onChange={(e) => setRoleName(e.target.value)}
                                    className={[
                                        "h-8 w-full rounded-sm border px-2 text-sm outline-none",
                                        error ? "border-red-500" : "border-gray-300",
                                    ].join(" ")}
                                    placeholder="Enter role name"
                                />
                                {error ? (
                                    <div className="text-xs text-red-600">{error}</div>
                                ) : (
                                    <div className="text-xs text-transparent">.</div>
                                )}
                            </div>
                        </div>

                        {/* Rights area */}
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[140px_1fr]">
                            <div className="pt-2 text-sm font-semibold text-gray-800">
                                Please select rights:
                            </div>

                            <div className="grid grid-cols-1 items-start gap-4 md:grid-cols-[260px_1fr]">
                                {/* LEFT: Privileges list (same card style) */}
                                <div className="overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-sm">
                                    <div className="overflow-x-auto">
                                        <table className="w-full table-fixed text-sm">
                                            <thead className="bg-gray-50">
                                                <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                                                    <th className="px-4 py-1">Privileges</th>
                                                    <th className="w-[90px] px-4 py-1 text-center">Action</th>
                                                </tr>
                                            </thead>

                                            <tbody className="divide-y divide-gray-100 h-full overflow-y-scroll">
                                                {privileges.map((p) => {
                                                    const active = selectedPrivilege === p;

                                                    return (
                                                        <tr
                                                            key={p}
                                                            className={[
                                                                "hover:bg-gray-50",
                                                                active ? "bg-gray-50" : "bg-white",
                                                            ].join(" ")}
                                                        >
                                                            <td className="px-4 py-2">
                                                                <button
                                                                    type="button"
                                                                    onClick={() => setSelectedPrivilege(p)}
                                                                    className={[
                                                                        "w-full text-left",
                                                                        active
                                                                            ? "font-semibold text-gray-900"
                                                                            : "text-gray-700",
                                                                    ].join(" ")}
                                                                >
                                                                    {p}
                                                                </button>
                                                            </td>

                                                            <td className="px-4 py-2">
                                                                <div className="flex justify-center">
                                                                    <Checkbox
                                                                        checked={!!privAction[p]}
                                                                        onChange={() => togglePrivilegeAction(p)}
                                                                    />
                                                                </div>
                                                            </td>
                                                        </tr>
                                                    );
                                                })}
                                            </tbody>
                                        </table>
                                    </div>

                                    {/* keep height + scroll like old UI */}
                                    <div className="max-h-[240px] overflow-auto" />
                                </div>

                                {/* RIGHT: Tabs + permissions (same card style) */}
                                <div className="max-h-full overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
                                    {/* Tabs bar */}
                                    <div className="flex flex-wrap gap-1 border-b border-gray-200 bg-gray-50 px-2 py-2">
                                        {tabs.map((t) => {
                                            const isActive = activeTab === t;
                                            return (
                                                <button
                                                    key={t}
                                                    type="button"
                                                    onClick={() => setActiveTab(t)}
                                                    className={[
                                                        "rounded-sm border px-2 py-1 text-xs font-semibold",
                                                        isActive
                                                            ? "border-gray-300 bg-white text-blue-700"
                                                            : "border-gray-200 bg-gray-100 text-blue-600 hover:bg-white",
                                                    ].join(" ")}
                                                >
                                                    {t}
                                                </button>
                                            );
                                        })}
                                    </div>

                                    {/* Permission list (AUTO HEIGHT) */}
                                    <div className="px-4 py-3">
                                        <div className="space-y-2">
                                            {(permissionsByTab[activeTab] || []).map((perm) => {
                                                const checked = !!checkedPerms?.[activeTab]?.[perm];
                                                return (
                                                    <label key={perm} className="flex items-center gap-2 text-sm text-gray-700">
                                                        <input
                                                            type="checkbox"
                                                            className="h-3.5 w-3.5 rounded border-gray-300"
                                                            checked={checked}
                                                            onChange={() => togglePermission(activeTab, perm)}
                                                        />
                                                        <span className="text-sm">{perm}</span>
                                                    </label>
                                                );
                                            })}
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Status + Buttons (same as Previlage) */}
                        <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-[140px_260px_1fr] md:items-center">
                            <div className="text-sm font-semibold text-gray-800">Status:</div>

                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value)}
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
                                    Save
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

                {/* Bottom List Table (same style as Previlage bottom table) */}
                <div className="mt-4 overflow-hidden rounded-xl bg-white">
                    <div className="flex items-center justify-between gap-3 px-4 py-3">
                        <p className="text-sm text-gray-600">
                            Showing{" "}
                            <span className="font-semibold text-gray-900">{roleRows.length}</span>{" "}
                            roles
                        </p>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="min-w-[1000px] w-full text-sm">
                            <thead className="bg-gray-50">
                                <tr className="text-left text-xs font-bold uppercase tracking-wide text-gray-600">
                                    <th className="px-4 py-2">Role</th>
                                    <th className="px-4 py-2">Created By</th>
                                    <th className="px-4 py-2">Created Date</th>
                                    <th className="px-4 py-2">Modified By</th>
                                    <th className="px-4 py-2">Modified Date</th>
                                    <th className="px-4 py-2 text-right">Edit</th>
                                    <th className="px-4 py-2 text-right">History</th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {roleRows.map((r) => (
                                    <tr key={r.id} className="hover:bg-gray-50">
                                        <td className="px-4 py-2 font-semibold text-gray-900">{r.role}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.createdBy || "-"}</td>
                                        <td className="px-4 py-2 text-gray-700">{r.createdDate || "-"}</td>
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

                                {roleRows.length === 0 && (
                                    <tr>
                                        <td colSpan={7} className="px-4 py-8 text-center text-gray-500">
                                            No roles found.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="h-6" />
            </div>
        </div>
    );
};

export default Roles;
