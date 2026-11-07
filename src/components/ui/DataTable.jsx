// columns: [{ key, header, render?: (row) => node }]
const DataTable = ({ columns, rows = [], empty = "No records found.", rowKey = "_id" }) => (
    <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white">
        <table className="w-full min-w-[640px] text-left text-sm">
            <thead className="bg-gray-50 text-xs uppercase tracking-wide text-gray-500">
                <tr>
                    {columns.map((c) => (
                        <th key={c.key} className="px-4 py-3 font-semibold">
                            {c.header}
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
                {rows.length === 0 ? (
                    <tr>
                        <td colSpan={columns.length} className="px-4 py-10 text-center text-gray-500">
                            {empty}
                        </td>
                    </tr>
                ) : (
                    rows.map((row, i) => (
                        <tr key={row[rowKey] ?? i} className="hover:bg-gray-50">
                            {columns.map((c) => (
                                <td key={c.key} className="px-4 py-3 align-middle text-[#1F2937]">
                                    {c.render ? c.render(row) : (row[c.key] ?? "—")}
                                </td>
                            ))}
                        </tr>
                    ))
                )}
            </tbody>
        </table>
    </div>
);

export default DataTable;
