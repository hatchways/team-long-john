type setOpenDays = (value: React.SetStateAction<string[]>) => void;

export interface availSettingProp {
  openDays: string[];
  setOpenDays: setOpenDays;
}
