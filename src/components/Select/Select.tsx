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
  onHandleChange?: (value: string) => void;
}

const Selection = ({ placeholder, data, setData, value }: SelectionProps) => {
  return (
    <div className="Selection">
      <Select
        value={value}
        onValueChange={(val) => {
          const selectedItem = data.find((item: any) => item.name === val);
          setData(selectedItem);
        }}
      >
        <SelectTrigger className="Selection-header">
          <SelectValue placeholder={value ? value : placeholder} />
        </SelectTrigger>
        <SelectContent className="Selection-container">
          <SelectGroup>
            <SelectLabel>Lọc theo hạng bằng lái</SelectLabel>
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
