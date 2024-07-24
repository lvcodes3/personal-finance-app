import { useState } from "react";
import { CellProps } from "react-table";

import { FinancialRecord } from "../../contexts/financialRecordContext";

interface EditableCellProps extends CellProps<FinancialRecord> {
  updateRecord: (rowIdx: number, columnId: string, value: unknown) => void;
  editable: boolean;
}

export const EditableCell: React.FC<EditableCellProps> = ({
  value: initialValue,
  row,
  column,
  updateRecord,
  editable,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [value, setValue] = useState(initialValue);

  const onBlur = () => {
    setIsEditing(false);
    updateRecord(row.index, column.id, value);
  };

  return (
    <div
      onClick={() => editable && setIsEditing(true)}
      className={editable ? "cursor-pointer" : "cursor-default"}
    >
      {isEditing ? (
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoFocus
          onBlur={onBlur}
          className="bg-slate-700"
        />
      ) : typeof value === "string" ? (
        value
      ) : (
        value.toString()
      )}
    </div>
  );
};
