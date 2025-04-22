import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import "./Selection.scss";

interface SelectionProps {
  value?: string | null;
  placeholder: string;
  data: any;
  setData: (data: any) => void;
  lable?: string;
  title?: string | null;
}

const Selection = ({
  placeholder,
  data,
  lable,
  title,
  setData,
  value,
}: SelectionProps) => {
  const handleValueChange = (val: string) => {
    if (val) {
      // Pass the entire item object to setData
      setData(val);
    }
  };

  return (
    <div className="Selection">
      {title != null && (
        <p className="text-[12px] text-primary font-semibold">
          {title ? title : "Lọc bằng hạng bằng lái"}
        </p>
      )}
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="Selection-header">
          <SelectValue
            placeholder={
              data.find((item: any) => item.id === value)?.name || placeholder
            }
          />
        </SelectTrigger>
        <SelectContent className="Selection-container">
          <SelectGroup>
            <SelectLabel>
              {lable ? lable : "Lọc theo hạng bằng lái"}
            </SelectLabel>
            {data.map((item: any) => (
              <SelectItem key={item.id} value={item.id} className="text-[12px]">
                {item.name}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default Selection;
