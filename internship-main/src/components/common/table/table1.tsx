import React from 'react';

interface Column<T> {
  key: keyof T | string;
  header: string;
  width?: string;
  render?: (item: T) => React.ReactNode;
}

interface GenericTable1Props<T extends { id: string; label: string }> {
  data: T[];
  columns: Column<T>[];
}

const GenericTable1 = <
  T extends { id: string; label: string; [key: string]: unknown },
>({
  data,
  columns,
}: GenericTable1Props<T>) => (
  <section className="mx-auto w-full max-w-7xl overflow-hidden rounded-xl">
    <table className="w-full border-separate border-spacing-0 text-left text-xs shadow-none md:text-sm">
      <thead className="text-xs uppercase">
        <tr>
          {columns.map((column, index) => (
            <th
              key={column.key.toString() || `empty-${index}`}
              scope="col"
              className={` ${column.width || ''} ${index === 0 ? 'rounded-tl-xl' : ''} ${
                index === columns.length - 1 ? 'rounded-tr-xl' : ''
              } ${index === 0 ? 'border-4' : 'border-4 border-l'} border-b px-2 py-3`}
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
                className={`border-4 ${
                  rowIndex === data.length - 1
                    ? colIndex === 0
                      ? 'rounded-bl-xl'
                      : colIndex === columns.length - 1
                        ? 'rounded-br-xl'
                        : ''
                    : ''
                } ${rowIndex !== data.length - 1 ? 'border-b' : ''} ${
                  colIndex !== 0 ? 'border-l' : ''
                } px-2 py-4 ${colIndex === 0 ? 'whitespace-nowrap font-medium' : ''} `}
              >
                {column.render ? (
                  column.render(item)
                ) : (
                  <span>{item[column.key as keyof T] as string}</span>
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </section>
);

export default GenericTable1;
