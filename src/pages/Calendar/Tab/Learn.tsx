import axios from "axios";
import { useEffect, useState } from "react";
import { SelectSingleEventHandler } from "react-day-picker";
import Selection from "../../../components/Select/Select";
import { Calendar } from "../../../components/ui/calendar";
import { LicenseType } from "../../../store/type/Lincense";
import { ScheduleType } from "../../../store/type/ScheduleItem";
import ScheduleItem from "../Component/Schedule";

interface LearnProps {
  scheduleData: ScheduleType[];
  date: Date;
  getCourseForCalendar: SelectSingleEventHandler;
}

export const formatDate = (d: Date): string => {
  const year = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

const Learn = ({ scheduleData, date, getCourseForCalendar }: LearnProps) => {
  const [typeOfLicense, setTypeOfLicense] = useState<LicenseType[]>([]);
  const [licenseType, setLicenseType] = useState<string>("Chọn loại bằng");
  const [filteredSchedule, setFilteredSchedule] =
    useState<ScheduleType[]>(scheduleData);

  const getTypeOfLicense = async () => {
    try {
      const response = await axios.get(
        import.meta.env.VITE_API_URL + "/api/license_type/?skip=0&limit=100"
      );
      const licenseTypes = response.data.items.map((item: any) => ({
        id: item.id,
        name: item.type_name,
      }));
      // return licenseTypes;
      setTypeOfLicense(licenseTypes);
    } catch (error) {
      console.error("Error fetching license types:", error);
      return [];
    }
  };

  useEffect(() => {
    getTypeOfLicense();
  }, []);

  useEffect(() => {
    if (licenseType === "Chọn loại bằng") {
      setFilteredSchedule(scheduleData);
    } else {
      const filtered = scheduleData.filter(
        (item) => item.typeOfLicense.id === licenseType // make sure this field matches your ScheduleType structure
      );
      setFilteredSchedule(filtered);
    }
  }, [licenseType, scheduleData]);

  return (
    <div className="Calendar-test">
      <div className="Calendar-big">
        <ScheduleItem
          scheduleData={filteredSchedule}
          selectedDate={date}
          isCourse={true}
        />
      </div>
      <div className="Calendar-small">
        <div className="Calendar-filter mb-5">
          <Selection
            title="Lọc bằng hạng bằng lái"
            placeholder={licenseType}
            data={typeOfLicense}
            setData={(val) => setLicenseType(val)}
          ></Selection>
        </div>
        <Calendar
          mode="single"
          selected={date}
          onSelect={getCourseForCalendar}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Learn;
