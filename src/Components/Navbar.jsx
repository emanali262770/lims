import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const MENU = [
  {
    label: "Tests Setup",
    to: "/tests-setup",
    children: [
      { label: "Specimen Category", to: "/specimen-category" },
      { label: "Lab Department", to: "/lab-department" },
      { label: "Sub Department", to: "/sub-department" },
      { label: "Test Head", to: "/test-head" },
      { label: "Specimens", to: "/specimens" },
      { label: "Lab Tests", to: "/tests-setup/lab-tests" },
      { label: "Culture Group", to: "/tests-setup/culture-group" },
      { label: "Culture Medicine", to: "/tests-setup/culture-medicine" },
      { label: "Remarks", to: "/tests-setup/remarks" },
      { label: "Test Package", to: "/tests-setup/test-package" },
      { label: "Blank Test Template", to: "/tests-setup/blank-test-template" },
      { label: "PCR/CytoHisto Template", to: "/tests-setup/pcr-cytohisto-template" },
      { label: "Test Control Setup", to: "/tests-setup/test-control-setup" },
    ],
  },

  {
    label: "General Setup",
    to: "/general-setup",
    children: [
      { label: "Rate List Category", to: "/general-setup/rate-list-category" },
      { label: "Country", to: "/general-setup/country" },
      { label: "Wards/Bed", to: "/general-setup/wards-bed" },
      { label: "Zone", to: "/general-setup/zone" },
      { label: "City", to: "/general-setup/city" },
      { label: "Out Source Labs", to: "/general-setup/out-source-labs" },
      { label: "Stat Lab Tests", to: "/general-setup/stat-lab-tests" },
      { label: "Rate Type List", to: "/general-setup/rate-type-list" },
      { label: "Reference / Doctors", to: "/general-setup/reference-doctors" },
      { label: "Update Rates", to: "/general-setup/update-rates" },
      { label: "Doctor Stamp", to: "/general-setup/doctor-stamp" },
      { label: "Lab Doctors", to: "/general-setup/lab-doctors" },
    ],
  },

  {
    label: "Patients",
    to: "/patients",
    children: [
      { label: "Patient Registration", to: "/patients/registration" },
      { label: "Sample Collect", to: "/patients/sample-collect" },
      { label: "Sample Audit", to: "/patients/sample-audit" },
      { label: "Sample Receiving", to: "/patients/sample-receiving" },
      { label: "Test In Process", to: "/patients/test-in-process" },
      { label: "Sample Dispatch", to: "/patients/sample-dispatch" },
      { label: "Result Entry Page", to: "/patients/result-entry" },
      { label: "Test Approve", to: "/patients/test-approve" },
      { label: "Report Printing", to: "/patients/report-printing" },
      { label: "Front Desk", to: "/patients/front-desk" },
      { label: "Daily Ledger", to: "/patients/daily-ledger" },
      { label: "Front Desk Report Printing", to: "/patients/front-desk-report-printing" },
      { label: "Sms & Email", to: "/patients/sms-email" },
      { label: "Online Report Verification", to: "/patients/online-report-verification" },
      { label: "Daily Ledger for Manager", to: "/patients/daily-ledger-manager" },
      { label: "Daily Controls/Standards", to: "/patients/daily-controls-standards" },
    ],
  },

  {
    label: "Tools",
    to: "/tools",
    children: [
      { label: "Dengue Patient data", to: "/tools/dengue-patient-data" },
      { label: "Company Recovery", to: "/tools/company-recovery" },
      { label: "Cash Deposit", to: "/tools/cash-deposit" },
      { label: "PFA Patients", to: "/tools/pfa-patients" },
      { label: "PFA Patients Summary", to: "/tools/pfa-patients-summary" },
      { label: "Out Side Test", to: "/tools/out-side-test" },
      { label: "DashBoard", to: "/tools/dashboard" },
      { label: "Parcel Receiving", to: "/tools/parcel-receiving" },
      { label: "Reference Balance", to: "/tools/reference-balance" },
    ],
  },

  {
    label: "Accounts",
    to: "/accounts",
    children: [
      { label: "Reference Bill (Branch Wise)", to: "/accounts/reference-bill-branch-wise" },
      { label: "Reference Bill (Center Wise)", to: "/accounts/reference-bill-center-wise" },
      { label: "Reference Bill (Reference Wise)", to: "/accounts/reference-bill-reference-wise" },
      { label: "Reference / Doctors", to: "/accounts/reference-doctors" },
      { label: "Voucher", to: "/accounts/voucher" },
    ],
  },

  {
    label: "Reports",
    to: "/reports",
    children: [
      { label: "Out Source Lab Rate Comparison", to: "/reports/out-source-lab-rate-comparison" },
      { label: "Lab Cash Summary", to: "/reports/lab-cash-summary" },
      { label: "Parcel Entry Status", to: "/reports/parcel-entry-status" },
      { label: "Result Detail", to: "/reports/result-detail" },
      { label: "Cash Log", to: "/reports/cash-log" },
      { label: "Cash Summary", to: "/reports/cash-summary" },
      { label: "Patient Summary", to: "/reports/patient-summary" },
      { label: "User WorkSheet", to: "/reports/user-worksheet" },
      { label: "Daily Work Sheet", to: "/reports/daily-work-sheet" },
      { label: "Lab Shift Pending Tests", to: "/reports/lab-shift-pending-tests" },
      { label: "S/D Work Sheet", to: "/reports/sd-work-sheet" },
      { label: "Section/Test Wise Count", to: "/reports/section-test-wise-count" },
      { label: "Rate List", to: "/reports/rate-list" },
      { label: "Slide Making", to: "/reports/slide-making" },
      { label: "Test Comments Detail", to: "/reports/test-comments-detail" },
      { label: "Out Side Test", to: "/reports/out-side-test" },
      { label: "Online Samples", to: "/reports/online-samples" },
      { label: "TAT Report", to: "/reports/tat-report" },
      { label: "Critical Test Result", to: "/reports/critical-test-result" },
      { label: "Company List", to: "/reports/company-list" },
      { label: "Reference Bill Log", to: "/reports/reference-bill-log" },
      { label: "Status Wise Test Report", to: "/reports/status-wise-test-report" },
      { label: "Cancel Registration", to: "/reports/cancel-registration" },
      { label: "Antibiogram", to: "/reports/antibiogram" },
      { label: "User Log", to: "/reports/user-log" },
    ],
  },

  {
    label: "Reference/Doctors Reports",
    to: "/reference-doctors-reports",
    children: [
      { label: "Reference Bill (Branch Wise)", to: "/reference-reports/branch-wise" },
      { label: "Reference Bill (Admin Only)", to: "/reference-reports/admin-only" },
      { label: "Reference Daily Payment", to: "/reference-reports/daily-payment" },
      { label: "Reference Balance", to: "/reference-reports/reference-balance" },
      { label: "Debitor Summary Report", to: "/reference-reports/debitor-summary" },
      { label: "Reference Bill (Center Wise)", to: "/reference-reports/center-wise" },
      { label: "Reference Bill (Reference Wise)", to: "/reference-reports/reference-wise" },
      { label: "Reference Out Side Tests", to: "/reference-reports/out-side-tests" },
      { label: "Monthly Ledger", to: "/reference-reports/monthly-ledger" },
      { label: "Reference Targets", to: "/reference-reports/reference-targets" },
      { label: "Company Address", to: "/reference-reports/company-address" },
      { label: "Reference Bill Franchise and CC", to: "/reference-reports/franchise-cc" },
      { label: "Doctor Wise Sale", to: "/reference-reports/doctor-wise-sale" },
      { label: "Branch Wise Bill", to: "/reference-reports/branch-wise-bill" },
    ],
  },

  {
    label: "Admin",
   
    children: [
      { label: "Privileges", to: "/privileges" },
      { label: "Roles", to: "/roles" },
      { label: "Users", to: "/users" },
      { label: "Reference Types", to: "/reference-types" },
      { label: "User Rights Report", to: "/user-rights-report" },
    ],
  },
];


const Navbar = () => {
  const [openMenu, setOpenMenu] = useState(null);
  const navRef = useRef(null);
  const navigate = useNavigate();
  const location = useLocation();

  // close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        setOpenMenu(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // close dropdown when route changes
  useEffect(() => {
    setOpenMenu(null);
  }, [location.pathname]);

  const isActiveTop = (item) => {
    // active if current path starts with item's base path
    if (!item.to) return false;
    return location.pathname === item.to || location.pathname.startsWith(item.to + "/");
  };

  return (
    <div ref={navRef} className="w-full border-b border-black/10">
      {/* Top bar */}
      <div className="bg-secondary">
        <div className="mx-auto flex items-center justify-between px-6 py-3">
          <div className="flex items-center gap-3">
            <img
              src="/images/logo.png"
              alt="Rabia Welfare Hospital"
              className="h-16 w-auto object-contain"
            />
          </div>

          <div className="flex items-center gap-3 text-sm font-semibold text-white/90">
            <button
              onClick={() => navigate("/")}
              className="hover:text-white hover:underline"
            >
              Log Out
            </button>
            <span className="text-white/40">|</span>
            <button className="hover:text-white hover:underline">
              Change Password
            </button>
          </div>
        </div>
      </div>

      {/* Menu bar */}
      <div className="bg-secondary border-t-[1px] border-white">
        <div className="mx-auto flex flex-wrap items-stretch px-6">
          {MENU.map((item) => {
            const hasChildren = Array.isArray(item.children) && item.children.length > 0;
            const isOpen = openMenu === item.label;
            const active = isActiveTop(item);

            return (
              <div key={item.label} className="relative">
                {/* TOP ITEM */}
                {hasChildren ? (
                  <button
                    type="button"
                    onClick={() => setOpenMenu(isOpen ? null : item.label)}
                    className={[
                      "group flex items-center gap-2",
                      "px-4 py-2 text-[13px] font-semibold",
                      "border-r border-white/15",
                      "text-white/95 hover:bg-white/10",
                      "focus:outline-none",
                      active ? "bg-white/10" : "",
                    ].join(" ")}
                  >
                    <span>{item.label}</span>

                    {/* Chevron */}
                    <span
                      className={[
                        "text-[10px] opacity-90 transition-transform",
                        isOpen ? "rotate-180" : "",
                      ].join(" ")}
                    >
                      ▼
                    </span>
                  </button>
                ) : (
                  <Link
                    to={item.to}
                    className={[
                      "flex items-center",
                      "px-4 py-2 text-[13px] font-semibold",
                      "border-r border-white/15",
                      "text-white/95 hover:bg-white/10",
                      active ? "bg-white/10" : "",
                    ].join(" ")}
                  >
                    {item.label}
                  </Link>
                )}

                {/* DROPDOWN */}
                {hasChildren && isOpen && (
                  <div
                    className="
                      absolute left-0 top-full z-50
                      mt-1 min-w-[260px]
                      overflow-hidden rounded-lg
                      border border-black/10
                      bg-white shadow-lg
                    "
                  >
                    <div className="bg-white py-1">
                      {item.children.map((child) => {
                        const childActive =
                          location.pathname === child.to ||
                          location.pathname.startsWith(child.to + "/");

                        return (
                          <Link
                            key={child.to}
                            to={child.to}
                            className={[
                              "block px-3 py-1 text-[13px]",
                              "text-gray-800 hover:bg-gray-50",
                              "border-b border-gray-100 last:border-b-0",
                              childActive ? "bg-gray-50 font-semibold" : "font-medium",
                            ].join(" ")}
                          >
                            {child.label}
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
