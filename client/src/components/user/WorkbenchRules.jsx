import { AlertCircle } from "lucide-react";

export default function WorkbenchRules() {
  const rules = [
    "Every order in our store will be randomly assigned to customers. To prevent illegal activities such as money laundering or malicious withdrawals, users must complete all assigned tasks. Tasks cannot be canceled midway; otherwise withdrawals will not be permitted.",
    "The commission for each order is randomly distributed by the system.",
    "Some order prices may fluctuate slightly due to market conditions.",
    "After a task is completed, funds are usually withdrawn within 10–30 minutes, but may take up to 24 hours depending on the withdrawal amount.",
    "Customers should verify their balance before submitting a withdrawal request. Please complete all ordering tasks before requesting a withdrawal.",
    "If any irregular activity is detected during order execution, the user's credit score may be automatically reduced.",
  ];

  return (
    <div className="bg-white shadow-lg p-2 my-2 md:p-6 md:my-6 text-slate-700">
      <div className="flex items-center gap-3 mb-5">
        <AlertCircle className="" size={28} />
        <h2 className="md:text-2xl font-bold">Workbench Rules</h2>
      </div>

      <div className="space-y-4">
        {rules.map((rule, index) => (
          <div
            key={index}
            className="flex gap-4 p-4 rounded-xl bg-gray-50 border border-gray-100"
          >
            <div className="w-8 h-8 shrink-0 rounded-full bg-slate-700 text-white flex items-center justify-center font-semibold">
              {index + 1}
            </div>

            <p className="leading-relaxed text-sm md:text-lg">{rule}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
