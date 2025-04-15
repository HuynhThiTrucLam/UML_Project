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
  value?: string;
  placeholder: string;
  data: any;
  setData: (data: any) => void;
  lable?: string;
  title?: string;
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
    const selectedItem = data.find((item: any) => item.name === val);
    if (selectedItem) {
      // Pass the entire item object to setData
      setData(selectedItem);
    }
  };

  return (
    <div className="Selection">
      <p>{title ? title : "Lọc bằng hạng bằng lái"}</p>
      <Select onValueChange={handleValueChange}>
        <SelectTrigger className="Selection-header">
          <SelectValue placeholder={value || placeholder} />
        </SelectTrigger>
        <SelectContent className="Selection-container">
          <SelectGroup>
            <SelectLabel>
              {lable ? lable : "Lọc theo hạng bằng lái"}
            </SelectLabel>
            {data.map((item: any) => (
              <SelectItem
                key={item.id}
                value={item.name}
                className="text-[12px]"
              >
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
