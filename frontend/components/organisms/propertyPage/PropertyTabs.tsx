import PropertyConditionCard from "@/components/atoms/propertyPage/PropertyConditionCard";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PropertyData } from "@/types/notionTypes";
import {
  propertyConditionOptions,
  PropertyConditionOptionsType,
  propertyTabsOptions,
} from "@/config/commonOptions";
import { getPropertyValue, getStartDate } from "@/utlis/getPropertyValue";
import { FC } from "react";

type PropertyTabsProps = {
  propertyData: PropertyData;
};
type NewPropertyDataType = PropertyData & {
  対象: string;
  入居日: string | JSX.Element | null;
};

export const PropertyTabs: FC<PropertyTabsProps> = ({ propertyData }) => {
  const newPropertyData: NewPropertyDataType = {
    ...propertyData,
    対象: getPropertyValue(propertyData.男性限定, "対象").checkbox
      ? "男性限定"
      : getPropertyValue(propertyData.女性限定, "対象").checkbox
      ? "女性限定"
      : "特になし",
    入居日: getStartDate(
      getPropertyValue(propertyData.ステータス, "status"),
      propertyData.退去予定日,
      propertyData.入居可能日,
      true
    ),
  };

  const {
    家賃,
    デポジット,
    光熱費込み,
    入居日,
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
    //　基本情報
    0: [
      家賃,
      デポジット,
      光熱費込み,
      入居日,
      ゾーン,
      エリア,
      最寄り駅,
      ミニマムステイ,
    ],
    // 部屋設備
    1: [鍵付き, ランドリー無料, Wifi込み],
    // 共有設備
    2: [ジム, プール, サウナ],
    // 入居条件
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
          <Card className="border-none shadow-none p-0">
            {/* <CardHeader>
              <CardTitle>{o.label}</CardTitle>
            </CardHeader> */}
            <CardContent className="space-y-2 mt-2 p-0">
              {/* <CardDescription>
                Here is the content for {o.label}
              </CardDescription> */}
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {tabContentMap[index]?.map((condition, idx) => (
                  <PropertyConditionCard
                    key={idx}
                    icon={condition.icon}
                    label={condition.label}
                    value={getPropertyValue(
                      newPropertyData[
                        condition.key as keyof NewPropertyDataType
                      ],
                      condition.type,
                      condition.unitType ? condition.unitType : undefined
                    )}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};
