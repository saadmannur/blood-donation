// Chart library chara simple horizontal bar list. items: [{ label, count }]
const BarList = ({ items = [], format = (l) => l, empty = "No data yet." }) => {
    if (!items.length) return <p className="text-sm text-gray-500">{empty}</p>;

    const max = Math.max(...items.map((i) => i.count), 1);

    return (
        <ul className="space-y-3">
            {items.map((i) => (
                <li key={i.label}>
                    <div className="mb-1 flex justify-between text-sm">
                        <span className="font-medium text-[#1F2937]">{format(i.label)}</span>
                        <span className="text-gray-500">{i.count}</span>
                    </div>
                    <div className="h-2 rounded-full bg-gray-100">
                        <div
                            className="h-2 rounded-full bg-red-600"
                            style={{ width: `${(i.count / max) * 100}%` }}
                        />
                    </div>
                </li>
            ))}
        </ul>
    );
};

export default BarList;
