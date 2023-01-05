import React from "react";
import {
  CaretRightFilled,
  RightCircleFilled,
  PlayCircleFilled,
  RightSquareFilled,
  PlusSquareFilled,
  ClockCircleFilled,
  PieChartFilled,
  BoxPlotFilled,
  FundFilled,
  SlidersFilled,
  AndroidFilled,
  ApiFilled,
  AppstoreFilled,
  BankFilled,
  BookFilled,
  BugFilled,
  BulbFilled,
  CarFilled,
  CarryOutFilled,
  CloudFilled,
  CompassFilled,
  ContainerFilled,
  CrownFilled,
  CustomerServiceFilled,
  DashboardFilled,
  DollarCircleFilled,
  DropboxCircleFilled,
  ExperimentFilled,
  FireFilled,
  FolderFilled,
  GiftFilled,
  GoldFilled,
  HeartFilled,
  RocketFilled,
  ShopFilled,
  ShoppingFilled,
  TagFilled,
  SmileFilled,
  ThunderboltFilled,
  FolderOpenFilled,
  FileFilled,
  FileWordTwoTone,
  FileExcelTwoTone,
  FilePdfTwoTone,
  FileUnknownTwoTone,
} from "@ant-design/icons";

const data = [
  {
    icon: <CaretRightFilled />,
  },
  {
    icon: <RightCircleFilled />,
  },
  {
    icon: <PlayCircleFilled />,
  },
  {
    icon: <RightSquareFilled />,
  },
  {
    icon: <PlusSquareFilled />,
  },
  {
    icon: <ClockCircleFilled />,
  },
  {
    icon: <PieChartFilled />,
  },
  {
    icon: <BoxPlotFilled />,
  },
  {
    icon: <FundFilled />,
  },
  {
    icon: <SlidersFilled />,
  },
  {
    icon: <AndroidFilled />,
  },
  {
    icon: <ApiFilled />,
  },
  {
    icon: <AppstoreFilled />,
  },
  {
    icon: <BankFilled />,
  },
  {
    icon: <BookFilled />,
  },
  {
    icon: <BugFilled />,
  },
  {
    icon: <BulbFilled />,
  },
  {
    icon: <CarFilled />,
  },
  {
    icon: <CarryOutFilled />,
  },
  {
    icon: <CloudFilled />,
  },
  {
    icon: <CompassFilled />,
  },
  {
    icon: <ContainerFilled />,
  },
  {
    icon: <CrownFilled />,
  },
  {
    icon: <CustomerServiceFilled />,
  },
  {
    icon: <DashboardFilled />,
  },
  {
    icon: <DollarCircleFilled />,
  },
  {
    icon: <DropboxCircleFilled />,
  },
  {
    icon: <ExperimentFilled />,
  },
  {
    icon: <FireFilled />,
  },
  {
    icon: <FolderFilled />,
  },
  {
    icon: <GiftFilled />,
  },
  {
    icon: <GoldFilled />,
  },
  {
    icon: <HeartFilled />,
  },
  {
    icon: <RocketFilled />,
  },
  {
    icon: <ShopFilled />,
  },
  {
    icon: <ShoppingFilled />,
  },
  {
    icon: <TagFilled />,
  },
  {
    icon: <SmileFilled />,
  },
  {
    icon: <ThunderboltFilled />,
  },
];

export function getIcon(i) {
  return data[i].icon;
}

export function getAllIcons() {
  return data;
}

export function getCustomIcon(i, color) {
  const style = {
    color: color,
  };

  const icon = React.cloneElement(data[i].icon, { style });
  return icon;
}

export function getIconFolder(isLeaf, isOld, expanded) {
  if (isLeaf)
    return <FileFilled style={{ color: isOld ? "#874D00" : "#1890FF" }} />;
  if (expanded) return <FolderOpenFilled style={{ color: "#FADB14" }} />;
  return <FolderFilled style={{ color: "#FADB14" }} />;
}

export function getIconFile({ name }) {
  const type = name.split(".").pop();
  if (type === "docx" || type === "doc") return <FileWordTwoTone />;
  else if (type === "xlsx" || type === "xls" || type === "xlsm")
    return <FileExcelTwoTone twoToneColor="#52c41a" />;
  else if (type === "pdf") return <FilePdfTwoTone twoToneColor="#eb2f96" />;
  else return <FileUnknownTwoTone twoToneColor="#002766" />;
}
