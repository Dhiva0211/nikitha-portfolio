import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (
    item: T,
    onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void,
  ) => React.ReactNode;
}

interface GenericTableProps<T> {
  data: T[];
  columns: Column<T>[];
  onRemove: (id: string) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>, id: string) => void;
  addUSPSDeal: () => void;
  addDHLDeal: () => void;
  addButtonText?: string;
}

const GenericTable3 = <T extends { id: string; label: string }>({
  data,
  columns,
  onRemove,
  onChange,
  addUSPSDeal,
  addDHLDeal,
  addButtonText,
}: GenericTableProps<T>) => (
  <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl">
    <table className="w-full border-separate border-spacing-0 text-left text-xs shadow-none md:text-sm">
      <thead className="text-xs uppercase">
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key.toString() || `empty-${index}`}
              scope="col"
              className={` ${column.width || ''} ${index === 0 ? 'rounded-tl-xl' : ''} ${index === columns.length - 1 ? 'rounded-tr-xl' : ''} ${index === 0 ? 'border-4' : 'border-4 border-l'} border-b px-2 py-3`}
            >
              {column.header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((item, rowIndex) => (
          <tr key={item.id} className="bg-white hover:bg-gray-50">
            {columns.map((column, colIndex) => (
              <td
                key={`${item.id}-${column.key.toString() || `empty-${colIndex}`}`}
                className={`border-4 ${rowIndex === data.length - 1 ? (colIndex === 0 ? 'rounded-bl-xl' : colIndex === columns.length - 1 ? 'rounded-br-xl' : '') : ''} ${rowIndex !== data.length - 1 ? 'border-b' : ''} ${colIndex !== 0 ? 'border-l' : ''} px-2 py-4 ${colIndex === 0 ? 'whitespace-nowrap font-medium' : ''}`}
              >
                {colIndex === 0 ? (
                  <div className="flex items-center justify-between">
                    <span className="mr-1 sm:mr-0">{item.label}</span>
                    <button
                      onClick={() => onRemove(item.id)}
                      className="flex size-6 items-center justify-center rounded-lg border-2 pb-1 sm:pb-0 md:size-8 md:rounded-xl"
                    >
                      -
                    </button>
                  </div>
                ) : column.render ? (
                  column.render(item, onChange)
                ) : (
                  <input
                    type="text"
                    className="w-full rounded border p-2"
                    value={item[column.key as keyof T] as string}
                    name={column.key as string}
                    onChange={e => onChange(e, item.id)}
                  />
                )}
              </td>
            ))}
          </tr>
        ))}

        <tr>
          <td colSpan={columns.length} className="py-4 text-center">
            <div className="flex justify-center space-x-4">
              <button
                onClick={addUSPSDeal}
                className="flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span className="ml-2">{addButtonText} Add USPS Deal</span>
              </button>

              <button
                onClick={addDHLDeal}
                className="flex items-center justify-center rounded-2xl border-4 px-4 py-2 hover:bg-deep-sapphire hover:text-white"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                  <line x1="12" y1="8" x2="12" y2="16" />
                  <line x1="8" y1="12" x2="16" y2="12" />
                </svg>
                <span className="ml-2">{addButtonText} Add DHL Deal</span>
              </button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
);

export default GenericTable3;
