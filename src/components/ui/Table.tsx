// Example Table.tsx
export const Table = ({ children }: { children: React.ReactNode }) => {
  return <table>{children}</table>;
};

export const TableHead = ({ children }: { children: React.ReactNode }) => {
  return <thead>{children}</thead>;
};

export const TableBody = ({ children }: { children: React.ReactNode }) => {
  return <tbody>{children}</tbody>;
};

export const TableRow = ({ children }: { children: React.ReactNode }) => {
  return <tr>{children}</tr>;
};

export const TableHeader = ({ children }: { children: React.ReactNode }) => {
  return <th>{children}</th>;
};

export const TableCell = ({ children }: { children: React.ReactNode }) => {
  return <td>{children}</td>;
};
