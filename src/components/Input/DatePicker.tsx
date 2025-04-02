"use client";

import * as React from "react";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";

import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";

export function DatePickerDemo() {
  const [date, setDate] = React.useState<Date>();

  return (
    <div className=" flex flex-col gap-2 w-full justify-center items-start w-full">
      <label className="text-[12px] font-semibold text-gray-700">
        Ngày sinh
      </label>
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full mt-0 border-[0.5px] border-gray-600  ",
              !date && "text-muted-foreground"
            )}
          >
            {date ? (
              format(date, "dd/MM/yyyy")
            ) : (
              <span className="text-gray-400">Chọn ngày</span>
            )}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
