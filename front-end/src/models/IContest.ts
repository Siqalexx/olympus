import { Itasks } from './ITasks';

export interface IContest {
    id: number;
    session: number;
    name: string;
    participantCount: number;
    judgeCount: number;
    usernamePrefix: string;
    duration: string;
    startTime: string | null;
    endTime: string | null;
    tasks: Itasks[];
}