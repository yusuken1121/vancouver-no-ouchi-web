import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { propertyTabsOptions } from "@/utlis/commonOptions";

export function PropertyTabs() {
  return (
    <Tabs defaultValue={propertyTabsOptions[0].value} className="w-full">
      <TabsList className="grid w-full grid-cols-4">
        {propertyTabsOptions.map((o, index) => (
          <>
            <TabsTrigger key={index} value={o.value}>
              {o.label}
            </TabsTrigger>
          </>
        ))}
      </TabsList>
      {propertyTabsOptions.map((o, index) => (
        <TabsContent key={index} value={o.value}>
          <Card>
            <CardHeader>
              <CardTitle>{o.label}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <CardDescription>
                Here is the content for {o.label}
              </CardDescription>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
