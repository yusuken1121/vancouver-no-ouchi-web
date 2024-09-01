import PropertyConditionCard from "@/components/atoms/propertyPage/PropertyConditionCard";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  propertyConditionOptions,
  PropertyConditionOptionsType,
  propertyTabsOptions,
} from "@/utlis/commonOptions";

export function PropertyTabs() {
  const {
    家賃,
    デポジット,
    光熱費込み,
    入居可能日,
    ゾーン,
    エリア,
    最寄り駅,
    ミニマムステイ,
    鍵付き,
    ランドリー無料,
    Wifi込み,
    ジム,
    プール,
    サウナ,
    カップル可,
    対象,
    物件のシェア人数,
    バスルームのシェア人数,
    キッチンのシェア人数,
  } = propertyConditionOptions;

  type TabContentMapType = {
    [key: number]: PropertyConditionOptionsType[]; // 各タブのインデックスに対応する配列
  };

  const tabContentMap: TabContentMapType = {
    0: [
      家賃,
      デポジット,
      光熱費込み,
      入居可能日,
      ゾーン,
      エリア,
      最寄り駅,
      ミニマムステイ,
    ],
    1: [鍵付き, ランドリー無料, Wifi込み],
    2: [ジム, プール, サウナ],
    3: [
      物件のシェア人数,
      対象,
      カップル可,
      バスルームのシェア人数,
      キッチンのシェア人数,
    ],
  };
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
              <div className="grid grid-cols-2 xl:grid-cols-3 gap-2">
                {tabContentMap[index]?.map((condition, idx) => (
                  <PropertyConditionCard
                    key={idx}
                    icon={condition.icon}
                    label={condition.label}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
}
