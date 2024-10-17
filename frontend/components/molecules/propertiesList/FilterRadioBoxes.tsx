import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { OptionStationType, stationOptions } from "@/utlis/commonOptions";
import { Label } from "@radix-ui/react-label";

type FilterRadioBoxesProps = {};
export function FilterRadioBoxes() {
  type railwayType = OptionStationType["railway"];
  const railwayArray: railwayType[] = ["expo", "canada", "millennium"];
  return (
    // <RadioGroup
    //   defaultValue={railwayArray[0]}
    //   className="flex items-center w-4/5 gap-1"
    // >
    //   {railwayArray.map((rail, idx) => {
    //     return (
    //       // <div key={idx} className="flex items-center space-x-2">
    //       <div
    //         key={idx}
    //         className={cn(
    //           "flex items-center box-content",
    //           cn(
    //             "flex items-center text-center px-2 py-1 rounded-lg",
    //             rail === "expo" && "bg-blue-600 text-white",
    //             rail === "canada" && "bg-sky-400 text-white",
    //             rail === "millennium" && "bg-yellow-300 text-black"
    //           )
    //         )}
    //       >
    //         <RadioGroupItem
    //           value={rail}
    //           id={rail}
    //           className="bg-white text-center"
    //         />
    //         <Label
    //           htmlFor={rail}
    //           className="flex items-center text-center px-2 rounded-lg gap-1"
    //         >
    //           {/* <span
    //             className={cn(
    //               // "w-4 h-4 rounded-none",
    //               rail === "expo" && "bg-blue-600",
    //               rail === "canada" && "bg-sky-400",
    //               rail === "millennium" && "bg-yellow-300"
    //             )}
    //           /> */}
    //           {rail}
    //         </Label>
    //       </div>
    //     );
    //   })}
    // </RadioGroup>
    <RadioGroup
      defaultValue={railwayArray[0]}
      className="flex items-center gap-2 max-w-full"
    >
      {railwayArray.map((rail) => (
        <div
          key={rail}
          className={cn(
            "flex flex-1 items-center justify-center text-center px-2 py-1 rounded-lg box-border",
            rail === "expo" && "bg-blue-600 text-white",
            rail === "canada" && "bg-sky-400 text-white",
            rail === "millennium" && "bg-yellow-300 text-black"
          )}
        >
          <RadioGroupItem
            value={rail}
            id={rail}
            className="bg-white text-center"
          />
          <Label htmlFor={rail} className="text-center px-1 rounded-lg">
            {rail}
          </Label>
        </div>
      ))}
    </RadioGroup>
  );
}
