interface PlayerType {
  Id: number;
  Name: string;
  Nation: string;
  DoB: number;
  DoJoining: number;
  DoDebuting: number | null;
  Position: string;
  Avatar: string;
  ShirtNumber: number;
  Goals: number;
  CleanSheets: number;
  Aperrances: number;
}

export type { PlayerType };
