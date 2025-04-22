import { useEffect, useState } from "react";
import { Calendar } from "../../../components/ui/calendar";
import { ScheduleType } from "../../../store/type/ScheduleItem";
import Schedule from "../Component/Schedule";
import { LicenseType } from "../../../store/type/Lincense";
import axios from "axios";
import Selection from "../../../components/Select/Select";

interface TestProps {
  scheduleData: ScheduleType[];
}

const Test = ({ scheduleData }: TestProps) => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [typeOfLicense, setTypeOfLicense] = useState<LicenseType[]>([]);
  const [licenseType, setLicenseType] = useState<string>("Chọn loại bằng");
  const [filteredSchedule, setFilteredSchedule] =
    useState<ScheduleType[]>(scheduleData);

  const getTestForCalendar = (date: Date | undefined) => {
    //Goi API de lay lich hoc cua tuan cua date
    setDate(date);
  };

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

  // useEffect(() => {
  //   //Goi API de lay lich hoc cua tuan hien tai
  //   setData(scheduleData);
  // }, [scheduleData]);

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
        <Schedule
          scheduleData={filteredSchedule}
          selectedDate={date}
          isCourse={false}
        ></Schedule>
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
          onSelect={getTestForCalendar}
          className="rounded-md border"
        />
      </div>
    </div>
  );
};

export default Test;
