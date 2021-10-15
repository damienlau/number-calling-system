import { AxiosResponse } from "axios";
import request from "../utils/request";

export interface queueResponseProps {
  department?: string;
  doctor?: string;
  id?: number;
  idno?: string;
  name?: string;
  pat_med_card?: string;
  register_time?: string;
  room_ip?: string;
  room_name?: string;
  statetext?: string;
  status?: string;
  triage_id?: number;
  triage_level?: string;
}

export interface responseProps {
  count?: number;
  next?: number;
  previous?: number;
  results?: queueResponseProps[];
}

export function findTriageQueue(parameter: {
  statetext: string;
  department?: string;
}) {
  return request
    .get("/api/triage/quene/", {
      params: parameter,
    })
    .then((response: responseProps) => {
      if (response.results !== undefined) {
        return response?.results.map((item) => {
          return {
            doctor: item.doctor,
            // 截取字符串进行自欺欺人的数据脱敏
            name:
              item.name?.length > 2
                ? item.name?.substring(0, 1) +
                  "*" +
                  item.name?.substring(
                    item.name?.length - 1,
                    item.name?.length
                  ) +
                  (item.triage_level && `(${item.triage_level}级)`)
                : item.name?.substring(0, 1) +
                  "*" +
                  (item.triage_level && `(${item.triage_level}级)`),
            triage_level: item.triage_level,
            room_name: item.room_name || "未知科室",
          };
        });
      }
    });
}
